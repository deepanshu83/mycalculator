$projectRoot = Split-Path -Parent $PSScriptRoot
$androidSdk = Join-Path $env:LOCALAPPDATA 'Android\Sdk'
$androidStudio = 'C:\Program Files\Android\Android Studio'
$javaHome = Join-Path $androidStudio 'jbr'
$adbPath = Join-Path $androidSdk 'platform-tools\adb.exe'
$emulatorPath = Join-Path $androidSdk 'emulator\emulator.exe'
$androidUserHome = Join-Path $projectRoot '.android'

if (-not (Test-Path $androidSdk)) {
  throw "Android SDK not found at $androidSdk"
}

if (-not (Test-Path $javaHome)) {
  throw "Android Studio JBR not found at $javaHome"
}

if (-not (Test-Path $adbPath)) {
  throw "adb.exe not found at $adbPath"
}

New-Item -ItemType Directory -Force -Path $androidUserHome | Out-Null

$env:ANDROID_HOME = $androidSdk
$env:ANDROID_SDK_ROOT = $androidSdk
$env:JAVA_HOME = $javaHome
$env:ANDROID_USER_HOME = $androidUserHome
$env:HOME = $projectRoot
$env:USERPROFILE = $projectRoot
$env:HOMEDRIVE = (Split-Path $projectRoot -Qualifier).TrimEnd('\')
$env:HOMEPATH = $projectRoot.Substring((Split-Path $projectRoot -Qualifier).Length)
$env:Path = "$($androidSdk)\platform-tools;$($androidSdk)\emulator;$javaHome\bin;$env:Path"
$env:EXPO_NO_DEVTOOLS = '1'

try {
  $deviceList = & $adbPath devices
} catch {
  throw "Unable to start adb. $_"
}

$hasDevice = $deviceList -match 'device$'

if (-not $hasDevice -and (Test-Path $emulatorPath)) {
  $avdList = & $emulatorPath -list-avds
  if ($avdList) {
    Start-Process -FilePath $emulatorPath -ArgumentList "-avd `"$($avdList[0])`""
    Start-Sleep -Seconds 8
  }
}

& npx.cmd expo start --android
