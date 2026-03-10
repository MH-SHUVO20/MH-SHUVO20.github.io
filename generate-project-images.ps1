$dir = 'f:\My Website\assets\img\projects'

function Get-SVG([string]$c1,[string]$c2,[string]$icon,[string]$title,[string]$sub) {
    $t = $title -replace '&','&amp;' -replace '<','&lt;' -replace '>','&gt;'
    $s = $sub   -replace '&','&amp;' -replace '<','&lt;' -replace '>','&gt;'
    return (
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 450" width="800" height="450">' +
        '<defs>' +
          '<linearGradient id="bar" x1="0" y1="0" x2="1" y2="0">' +
            "<stop offset='0%' stop-color='$c1'/>" +
            "<stop offset='100%' stop-color='$c2'/>" +
          '</linearGradient>' +
          '<linearGradient id="orb" x1="0" y1="0" x2="1" y2="1">' +
            "<stop offset='0%' stop-color='$c1'/>" +
            "<stop offset='100%' stop-color='$c2'/>" +
          '</linearGradient>' +
          '<filter id="gl" x="-100%" y="-100%" width="300%" height="300%">' +
            '<feGaussianBlur stdDeviation="60"/>' +
          '</filter>' +
          '<filter id="sr" x="-30%" y="-30%" width="160%" height="160%">' +
            '<feGaussianBlur stdDeviation="10"/>' +
          '</filter>' +
          '<pattern id="dt" width="28" height="28" patternUnits="userSpaceOnUse">' +
            '<circle cx="14" cy="14" r="0.75" fill="white" fill-opacity="0.07"/>' +
          '</pattern>' +
          '<radialGradient id="vg" cx="50%" cy="50%" r="65%">' +
            '<stop offset="0%" stop-color="transparent"/>' +
            '<stop offset="100%" stop-color="#070c18" stop-opacity="0.6"/>' +
          '</radialGradient>' +
        '</defs>' +
        '<rect width="800" height="450" fill="#070c18"/>' +
        "<ellipse cx='400' cy='200' rx='300' ry='260' fill='url(#orb)' fill-opacity='0.11' filter='url(#gl)'/>" +
        "<ellipse cx='640' cy='80' rx='220' ry='190' fill='$c2' fill-opacity='0.07' filter='url(#gl)'/>" +
        "<ellipse cx='160' cy='380' rx='180' ry='150' fill='$c1' fill-opacity='0.06' filter='url(#gl)'/>" +
        '<rect width="800" height="450" fill="url(#dt)"/>' +
        '<rect width="800" height="450" fill="url(#vg)"/>' +
        "<circle cx='400' cy='182' r='72' fill='$c1' fill-opacity='0.13' filter='url(#sr)'/>" +
        "<circle cx='400' cy='182' r='72' stroke='$c1' stroke-width='1.2' fill='none' stroke-opacity='0.3'/>" +
        "<circle cx='400' cy='182' r='56' stroke='$c2' stroke-width='0.8' fill='none' stroke-opacity='0.22'/>" +
        "<circle cx='400' cy='182' r='86' stroke='$c1' stroke-width='0.5' fill='none' stroke-opacity='0.11'/>" +
        '<text x="400" y="208" text-anchor="middle" font-size="52" font-family="Apple Color Emoji,Segoe UI Emoji,Noto Color Emoji,sans-serif">' + $icon + '</text>' +
        "<circle cx='368' cy='264' r='2' fill='$c1' fill-opacity='0.55'/>" +
        "<circle cx='400' cy='264' r='2.8' fill='$c2' fill-opacity='0.7'/>" +
        "<circle cx='432' cy='264' r='2' fill='$c1' fill-opacity='0.55'/>" +
        '<text x="400" y="300" text-anchor="middle" font-family="Trebuchet MS,Verdana,Arial,sans-serif" font-size="22" font-weight="700" fill="white" fill-opacity="0.95" letter-spacing="1.8">' + $t + '</text>' +
        "<text x='400' y='330' text-anchor='middle' font-family='Courier New,Courier,monospace' font-size='11' fill='$c2' fill-opacity='0.78' letter-spacing='2.5'>$s</text>" +
        '<rect x="0" y="441" width="800" height="9" fill="url(#bar)" opacity="0.85"/>' +
        "<circle cx='24' cy='24' r='3' fill='$c1' fill-opacity='0.4'/>" +
        "<circle cx='776' cy='24' r='3' fill='$c2' fill-opacity='0.4'/>" +
        '</svg>'
    )
}

function Make-SVG([string]$file,[string]$c1,[string]$c2,[string]$icon,[string]$title,[string]$sub) {
    $content = Get-SVG $c1 $c2 $icon $title $sub
    [System.IO.File]::WriteAllText("$dir\$file.svg", $content, [System.Text.UTF8Encoding]::new($false))
    Write-Host "  + $file.svg"
}

Write-Host "Generating 15 project cover images..."

Make-SVG 'agent-bd'           '#7c3aed' '#a78bfa' '🤖' 'MULTI-TOOL AI AGENT'     'LANGCHAIN · LANGGRAPH · LLM'
Make-SVG 'yolo-api'           '#0891b2' '#22d3ee' '⚡' 'TAKA NOTE DETECTION'     'YOLOV11 · FASTAPI · DOCKER'
Make-SVG 'llm-pipeline'       '#5b21b6' '#8b5cf6' '📄' 'LLM ARTICLE ANALYZER'    'OPENAI · N8N · AUTOMATION'
Make-SVG 'bert-nlp'           '#065f46' '#34d399' '🧠' 'BERT NLP FINE-TUNING'    'BERT · HUGGINGFACE · PYTORCH'
Make-SVG 'citywatch'          '#0c4a6e' '#0ea5e9' '🌆' 'CITYWATCH PLATFORM'      'PHP · MYSQL · FULL-STACK'
Make-SVG 'medical'            '#7f1d1d' '#f87171' '🏥' 'MEDICAL DETECTION AI'    'YOLO · PYTORCH · IEEE'
Make-SVG 'house'              '#78350f' '#fbbf24' '🏠' 'SMART HOUSE FORECAST'    'SKLEARN · XGBOOST · REGRESSION'
Make-SVG 'shuttle'            '#1e3a5f' '#38bdf8' '🚌' 'SHUTTLE MANAGEMENT'      'C# · MYSQL · .NET FORMS'
Make-SVG 'linkedin-agent'     '#1e40af' '#60a5fa' '💼' 'LINKEDIN AI AGENT'       'LANGCHAIN · OPENAI · AGENTS'
Make-SVG 'churn-prediction'   '#c2410c' '#fb923c' '📊' 'CHURN PREDICTION'        'RANDOM FOREST · ROC-AUC · ML'
Make-SVG 'iris-clustering'    '#6b21a8' '#e879f9' '🌸' 'IRIS CLUSTERING'         'K-MEANS · PCA · DBSCAN'
Make-SVG 'titanic-eda'        '#1e3a8a' '#3b82f6' '🚢' 'TITANIC EDA ANALYSIS'    'PANDAS · SEABORN · EDA'
Make-SVG 'data-foundations'   '#064e3b' '#34d399' '🧪' 'DATA FOUNDATIONS'        'NUMPY · PANDAS · SKLEARN'
Make-SVG 'california-housing' '#92400e' '#f59e0b' '🏡' 'CALIFORNIA HOUSING'      'LASSO · RIDGE · REGRESSION'
Make-SVG 'student-mgmt'       '#1e3a5f' '#38bdf8' '🎓' 'STUDENT MANAGEMENT'      'JAVA · SWING · OOP · CRUD'

Write-Host "Done."

    param([string]$file,[string]$c1,[string]$c2,[string]$icon,[string]$title,[string]$sub)
    $svg = @'
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 450" width="800" height="450">
  <defs>
    <linearGradient id="topbar" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="__C1__"/>
      <stop offset="100%" stop-color="__C2__"/>
    </linearGradient>
    <linearGradient id="orb" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="__C1__"/>
      <stop offset="100%" stop-color="__C2__"/>
    </linearGradient>
    <filter id="glow" x="-100%" y="-100%" width="300%" height="300%">
      <feGaussianBlur stdDeviation="60"/>
    </filter>
    <filter id="ring-blur" x="-30%" y="-30%" width="160%" height="160%">
      <feGaussianBlur stdDeviation="8"/>
    </filter>
    <pattern id="dots" width="28" height="28" patternUnits="userSpaceOnUse">
      <circle cx="14" cy="14" r="0.75" fill="white" fill-opacity="0.07"/>
    </pattern>
    <radialGradient id="vignette" cx="50%" cy="50%" r="70%">
      <stop offset="0%" stop-color="transparent"/>
      <stop offset="100%" stop-color="#070c18" stop-opacity="0.65"/>
    </radialGradient>
  </defs>

  <!-- Base background -->
  <rect width="800" height="450" fill="#070c18"/>

  <!-- Ambient glow blobs -->
  <ellipse cx="400" cy="200" rx="300" ry="260" fill="url(#orb)" fill-opacity="0.11" filter="url(#glow)"/>
  <ellipse cx="640" cy="80"  rx="220" ry="190" fill="__C2__" fill-opacity="0.07" filter="url(#glow)"/>
  <ellipse cx="160" cy="380" rx="180" ry="150" fill="__C1__" fill-opacity="0.06" filter="url(#glow)"/>

  <!-- Dot grid -->
  <rect width="800" height="450" fill="url(#dots)"/>

  <!-- Vignette -->
  <rect width="800" height="450" fill="url(#vignette)"/>

  <!-- Icon backdrop glow -->
  <circle cx="400" cy="182" r="72" fill="__C1__" fill-opacity="0.14" filter="url(#ring-blur)"/>

  <!-- Icon ring circles -->
  <circle cx="400" cy="182" r="72" stroke="__C1__" stroke-width="1.2" fill="none" stroke-opacity="0.3"/>
  <circle cx="400" cy="182" r="56" stroke="__C2__" stroke-width="0.8" fill="none" stroke-opacity="0.22"/>
  <circle cx="400" cy="182" r="84" stroke="__C1__" stroke-width="0.5" fill="none" stroke-opacity="0.12"/>

  <!-- Emoji Icon -->
  <text x="400" y="208" text-anchor="middle"
        font-size="52"
        font-family="Apple Color Emoji,Segoe UI Emoji,Noto Color Emoji,Twemoji Mozilla,sans-serif">__ICON__</text>

  <!-- Decorative dots -->
  <circle cx="368" cy="264" r="2"   fill="__C1__" fill-opacity="0.55"/>
  <circle cx="400" cy="264" r="2.8" fill="__C2__" fill-opacity="0.7"/>
  <circle cx="432" cy="264" r="2"   fill="__C1__" fill-opacity="0.55"/>

  <!-- Title -->
  <text x="400" y="300" text-anchor="middle"
        font-family="Trebuchet MS,Verdana,Arial Black,sans-serif"
        font-size="22" font-weight="700"
        fill="white" fill-opacity="0.95"
        letter-spacing="1.8">__TITLE__</text>

  <!-- Sub label (tech stack) -->
  <text x="400" y="330" text-anchor="middle"
        font-family="Courier New,Courier,Lucida Console,monospace"
        font-size="11" fill="__C2__"
        fill-opacity="0.75" letter-spacing="2.5">__SUB__</text>

  <!-- Bottom accent bar -->
  <rect x="0" y="441" width="800" height="9" fill="url(#topbar)" opacity="0.85"/>

  <!-- Corner accent dots -->
  <circle cx="24" cy="24" r="3" fill="__C1__" fill-opacity="0.35"/>
  <circle cx="776" cy="24" r="3" fill="__C2__" fill-opacity="0.35"/>
</svg>
'@
    $t = $title -replace '&','&amp;' -replace '<','&lt;' -replace '>','&gt;'
    $s = $sub   -replace '&','&amp;' -replace '<','&lt;' -replace '>','&gt;'
    $out = $svg `
        -replace '__C1__',  $c1 `
        -replace '__C2__',  $c2 `
        -replace '__ICON__', $icon `
        -replace '__TITLE__', $t `
        -replace '__SUB__',  $s
    [System.IO.File]::WriteAllText("$dir\$file.svg", $out, [System.Text.UTF8Encoding]::new($false))
    Write-Host "  ✓ $file.svg"
}

Write-Host "Generating project cover images..."

Make-SVG 'agent-bd'           '#7c3aed' '#a78bfa' '🤖' 'MULTI-TOOL AI AGENT'     'LANGCHAIN · LANGGRAPH · LLM'
Make-SVG 'yolo-api'           '#0891b2' '#22d3ee' '⚡' 'TAKA NOTE DETECTION'     'YOLOV11 · FASTAPI · DOCKER'
Make-SVG 'llm-pipeline'       '#5b21b6' '#8b5cf6' '📄' 'LLM ARTICLE ANALYZER'    'OPENAI · N8N · AUTOMATION'
Make-SVG 'bert-nlp'           '#065f46' '#34d399' '🧠' 'BERT NLP FINE-TUNING'    'BERT · HUGGINGFACE · PYTORCH'
Make-SVG 'citywatch'          '#0c4a6e' '#0ea5e9' '🌆' 'CITYWATCH PLATFORM'      'PHP · MYSQL · FULL-STACK'
Make-SVG 'medical'            '#7f1d1d' '#f87171' '🏥' 'MEDICAL DETECTION AI'    'YOLO · PYTORCH · IEEE'
Make-SVG 'house'              '#78350f' '#fbbf24' '🏠' 'SMART HOUSE FORECAST'    'SKLEARN · XGBOOST · REGRESSION'
Make-SVG 'shuttle'            '#1e3a5f' '#38bdf8' '🚌' 'SHUTTLE MANAGEMENT'      'C# · MYSQL · .NET FORMS'
Make-SVG 'linkedin-agent'     '#1e40af' '#60a5fa' '💼' 'LINKEDIN AI AGENT'       'LANGCHAIN · OPENAI · AGENTS'
Make-SVG 'churn-prediction'   '#c2410c' '#fb923c' '📊' 'CHURN PREDICTION'        'RANDOM FOREST · ROC-AUC · ML'
Make-SVG 'iris-clustering'    '#6b21a8' '#e879f9' '🌸' 'IRIS CLUSTERING'         'K-MEANS · PCA · DBSCAN'
Make-SVG 'titanic-eda'        '#1e3a8a' '#3b82f6' '🚢' 'TITANIC EDA ANALYSIS'    'PANDAS · SEABORN · EDA'
Make-SVG 'data-foundations'   '#064e3b' '#34d399' '🧪' 'DATA FOUNDATIONS'        'NUMPY · PANDAS · SKLEARN'
Make-SVG 'california-housing' '#92400e' '#f59e0b' '🏡' 'CALIFORNIA HOUSING'      'LASSO · RIDGE · REGRESSION'
Make-SVG 'student-mgmt'       '#1e3a5f' '#38bdf8' '🎓' 'STUDENT MANAGEMENT'      'JAVA · SWING · OOP · CRUD'

Write-Host "Done! 15 SVG covers created in $dir"
