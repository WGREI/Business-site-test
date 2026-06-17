param([int]$Port = 5180)
$Root = $PSScriptRoot
$Prefix = "http://127.0.0.1:$Port/"
$MimeTypes = @{
  ".html" = "text/html; charset=utf-8"
  ".css" = "text/css; charset=utf-8"
  ".js" = "application/javascript; charset=utf-8"
  ".svg" = "image/svg+xml"
}
$Listener = [System.Net.HttpListener]::new()
$Listener.Prefixes.Add($Prefix)
$Listener.Start()
Write-Host "Preview running at $Prefix"
try {
  while ($Listener.IsListening) {
    $Context = $Listener.GetContext()
    $RequestPath = [System.Uri]::UnescapeDataString($Context.Request.Url.AbsolutePath.TrimStart("/"))
    if ([string]::IsNullOrWhiteSpace($RequestPath)) { $RequestPath = "index.html" }
    $FullPath = Join-Path $Root $RequestPath
    $ResolvedRoot = [System.IO.Path]::GetFullPath($Root)
    $ResolvedPath = [System.IO.Path]::GetFullPath($FullPath)
    if (-not $ResolvedPath.StartsWith($ResolvedRoot, [System.StringComparison]::OrdinalIgnoreCase)) { $Context.Response.StatusCode = 403; $Context.Response.Close(); continue }
    if (-not [System.IO.File]::Exists($ResolvedPath)) { $Context.Response.StatusCode = 404; $Context.Response.Close(); continue }
    $Extension = [System.IO.Path]::GetExtension($ResolvedPath).ToLowerInvariant()
    $ContentType = $MimeTypes[$Extension]
    if (-not $ContentType) { $ContentType = "application/octet-stream" }
    $Bytes = [System.IO.File]::ReadAllBytes($ResolvedPath)
    $Context.Response.ContentType = $ContentType
    $Context.Response.ContentLength64 = $Bytes.Length
    $Context.Response.OutputStream.Write($Bytes, 0, $Bytes.Length)
    $Context.Response.OutputStream.Close()
  }
}
finally { $Listener.Stop() }
