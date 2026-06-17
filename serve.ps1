param(
  [int]$Port = 5174
)

$Root = Split-Path -Parent $MyInvocation.MyCommand.Path
$Prefix = "http://127.0.0.1:$Port/"
$MimeTypes = @{
  ".html" = "text/html; charset=utf-8"
  ".css" = "text/css; charset=utf-8"
  ".js" = "application/javascript; charset=utf-8"
  ".png" = "image/png"
  ".jpg" = "image/jpeg"
  ".jpeg" = "image/jpeg"
  ".webp" = "image/webp"
  ".svg" = "image/svg+xml"
}

$Listener = [System.Net.HttpListener]::new()
$Listener.Prefixes.Add($Prefix)
$Listener.Start()
Write-Host "Serving $Root at $Prefix"

try {
  while ($Listener.IsListening) {
    $Context = $Listener.GetContext()
    $RequestPath = [System.Uri]::UnescapeDataString($Context.Request.Url.AbsolutePath.TrimStart("/"))

    if ([string]::IsNullOrWhiteSpace($RequestPath)) {
      $RequestPath = "index.html"
    }

    $RequestedFile = Join-Path $Root $RequestPath
    $ResolvedRoot = [System.IO.Path]::GetFullPath($Root)
    $ResolvedFile = [System.IO.Path]::GetFullPath($RequestedFile)

    if (-not $ResolvedFile.StartsWith($ResolvedRoot, [System.StringComparison]::OrdinalIgnoreCase)) {
      $Context.Response.StatusCode = 403
      $Context.Response.Close()
      continue
    }

    if (-not [System.IO.File]::Exists($ResolvedFile)) {
      $Context.Response.StatusCode = 404
      $Context.Response.Close()
      continue
    }

    $Extension = [System.IO.Path]::GetExtension($ResolvedFile).ToLowerInvariant()
    $Context.Response.ContentType = $MimeTypes[$Extension]
    if (-not $Context.Response.ContentType) {
      $Context.Response.ContentType = "application/octet-stream"
    }

    $Bytes = [System.IO.File]::ReadAllBytes($ResolvedFile)
    $Context.Response.ContentLength64 = $Bytes.Length
    $Context.Response.OutputStream.Write($Bytes, 0, $Bytes.Length)
    $Context.Response.OutputStream.Close()
  }
}
finally {
  $Listener.Stop()
  $Listener.Close()
}
