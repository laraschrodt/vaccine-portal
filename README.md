# 🚀 RLP Vaccine Portal

## Docker starten
```bash
docker-compose up --build
```
**Und hiermit stoppen:**
```bash
docker-compose down

## 🐳 Docker-Container starten / stoppen

| Aktion | Befehl |
| ------ | ------ |
| **Start (Build + Run)** | ```bash<br>docker-compose up --build -d<br>``` |
| **Logs ansehen** | ```bash<br>docker-compose logs -f web<br>``` |
| **Container stoppen** | ```bash<br>docker-compose down<br>``` |

> 💡 *`-d` startet im Hintergrund; `logs -f` folgt den Logs deines Django-Containers.*

---

## 🐍 Virtuelle Python-Umgebung aktivieren

| Plattform | Befehl |
| --------- | ------ |
| **macOS / Linux (bash/zsh)** | ```bash<br>source backend/env/bin/activate<br>``` |
| **Windows PowerShell** | ```powershell<br>backend\env\Scripts\Activate.ps1<br>``` |
| **Windows CMD** | ```cmd<br>backend\env\Scripts\activate.bat<br>``` |

Deaktivieren: ```deactivate```

**Server starten:** ```python backend/manage.py runserver```

## Migrations machen
Spring in den Backend-Container rein:
bash```
docker-compose exec backend bash
```

Dann im Container:
bash```
python manage.py migrate

