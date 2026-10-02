$ErrorActionPreference = "Stop"

$root = Split-Path $PSScriptRoot -Parent
$configPath = Join-Path $root ".local/lead-agent-credentials.json"
if (-not (Test-Path -LiteralPath $configPath)) {
  throw "Lokale lead-agent-gegevens ontbreken: $configPath"
}

$config = Get-Content -LiteralPath $configPath -Raw | ConvertFrom-Json
function Unprotect-Value([string] $ciphertext) {
  $secure = ConvertTo-SecureString $ciphertext
  $pointer = [Runtime.InteropServices.Marshal]::SecureStringToBSTR($secure)
  try { return [Runtime.InteropServices.Marshal]::PtrToStringBSTR($pointer) }
  finally { [Runtime.InteropServices.Marshal]::ZeroFreeBSTR($pointer) }
}

$names = @("LEADS_AGENT_URL", "LEADS_AGENT_TOKEN", "CF_ACCESS_CLIENT_ID", "CF_ACCESS_CLIENT_SECRET")
$previous = @{}
foreach ($name in $names) { $previous[$name] = [Environment]::GetEnvironmentVariable($name, "Process") }

try {
  $env:LEADS_AGENT_URL = "https://leads.pixelpiraterij.nl"
  $env:LEADS_AGENT_TOKEN = Unprotect-Value $config.agent
  $env:CF_ACCESS_CLIENT_ID = Unprotect-Value $config.accessId
  $env:CF_ACCESS_CLIENT_SECRET = Unprotect-Value $config.accessSecret
  & node (Join-Path $PSScriptRoot "lead-agent-cli.mjs") @args
  $result = $LASTEXITCODE
} finally {
  foreach ($name in $names) { [Environment]::SetEnvironmentVariable($name, $previous[$name], "Process") }
}

exit $result
