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

function New-SVG([string]$file,[string]$c1,[string]$c2,[string]$icon,[string]$title,[string]$sub) {
    $content = Get-SVG $c1 $c2 $icon $title $sub
    [System.IO.File]::WriteAllText("$dir\$file.svg", $content, [System.Text.UTF8Encoding]::new($false))
    Write-Host "  + $file.svg"
}

Write-Host "Generating 20 project cover images..."

New-SVG 'agent-bd'           '#7c3aed' '#a78bfa' '🤖' 'MULTI-TOOL AI AGENT'     'LANGCHAIN · LANGGRAPH · LLM'
New-SVG 'yolo-api'           '#0891b2' '#22d3ee' '⚡' 'TAKA NOTE DETECTION'     'YOLOV11 · FASTAPI · DOCKER'
New-SVG 'llm-pipeline'       '#5b21b6' '#8b5cf6' '📄' 'LLM ARTICLE ANALYZER'    'OPENAI · N8N · AUTOMATION'
New-SVG 'bert-nlp'           '#065f46' '#34d399' '🧠' 'BERT NLP FINE-TUNING'    'BERT · HUGGINGFACE · PYTORCH'
New-SVG 'citywatch'          '#0c4a6e' '#0ea5e9' '🌆' 'CITYWATCH PLATFORM'      'PHP · MYSQL · FULL-STACK'
New-SVG 'medical'            '#7f1d1d' '#f87171' '🏥' 'MEDICAL DETECTION AI'    'YOLO · PYTORCH · IEEE'
New-SVG 'house'              '#78350f' '#fbbf24' '🏠' 'SMART HOUSE FORECAST'    'SKLEARN · XGBOOST · REGRESSION'
New-SVG 'shuttle'            '#1e3a5f' '#38bdf8' '🚌' 'SHUTTLE MANAGEMENT'      'C# · MYSQL · .NET FORMS'
New-SVG 'linkedin-agent'     '#1e40af' '#60a5fa' '💼' 'LINKEDIN AI AGENT'       'LANGCHAIN · OPENAI · AGENTS'
New-SVG 'churn-prediction'   '#c2410c' '#fb923c' '📊' 'CHURN PREDICTION'        'RANDOM FOREST · ROC-AUC · ML'
New-SVG 'iris-clustering'    '#6b21a8' '#e879f9' '🌸' 'IRIS CLUSTERING'         'K-MEANS · PCA · DBSCAN'
New-SVG 'titanic-eda'        '#1e3a8a' '#3b82f6' '🚢' 'TITANIC EDA ANALYSIS'    'PANDAS · SEABORN · EDA'
New-SVG 'data-foundations'   '#064e3b' '#34d399' '🧪' 'DATA FOUNDATIONS'        'NUMPY · PANDAS · SKLEARN'
New-SVG 'california-housing' '#92400e' '#f59e0b' '🏡' 'CALIFORNIA HOUSING'      'LASSO · RIDGE · REGRESSION'
New-SVG 'student-mgmt'       '#1e3a5f' '#38bdf8' '🎓' 'STUDENT MANAGEMENT'      'JAVA · SWING · OOP · CRUD'
New-SVG 'taka-yolo'          '#006A4E' '#34d399' '🇧🇩' 'TAKA YOLO TRAINING'      'YOLOV11 · ROBOFLOW · PYTORCH'
New-SVG 'cifar10'            '#4f46e5' '#a78bfa' '🔢' 'CIFAR-10 CLASSIFIER'     'TENSORFLOW · KERAS · DEEP MLP'
New-SVG 'nn-vs-cnn'          '#1d4ed8' '#34d399' '⚔' 'NN VS CNN BATTLE'        'TENSORFLOW · KERAS · CIFAR-10'
New-SVG 'imdb-sentiment'     '#0ea5e9' '#e879f9' '🎬' 'IMDB SENTIMENT'          'BERT · TFIDF · WORD2VEC · NLP'
New-SVG 'passport-agent'     '#006A4E' '#a78bfa' '🛂' 'PASSPORT AI AGENT'       'CREWAI · LANGCHAIN · LLAMA 4'

Write-Host 'Done! 20 SVG covers created in $dir'