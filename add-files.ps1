# PowerShell script to add all files properly

# Remove any existing git info
$frontendGitDir = Join-Path -Path $PWD -ChildPath "frontend\.git"
if (Test-Path $frontendGitDir) {
    Remove-Item -Recurse -Force $frontendGitDir
}

# Add all backend files
git add backend/

# Add each frontend file individually (to avoid submodule issues)
Get-ChildItem -Path "frontend" -Recurse -File -Force | 
    Where-Object { $_.FullName -notlike "*\node_modules\*" -and $_.FullName -notlike "*\.next\*" } | 
    ForEach-Object {
        $relativePath = $_.FullName.Substring($PWD.Path.Length + 1)
        Write-Host "Adding: $relativePath"
        git add "$relativePath"
    }

# Add root files
git add .gitignore
git add README.md
git add add-files.ps1

Write-Host "All files added successfully!" 