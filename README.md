<img src="frontend/public/images/dashboard.png" alt="dashboard">

<img src="frontend/public/images/report_handler_archi.png" alt="Report Handler Architecture">

# Usage

## Report Handler (React, Node, Express, Coreui, fs) - Responsive (Mobile & Web)

### Clone Repositorie

Clone this Repositorie to your local machine

```
git clone https://github.com/eugenebelieve/report-handler.git
```
### 1 - Install Dependencies in root folder

```
npm install
```

### 2 - Install Dependencies in frontend folder

```
cd frontend
npm install
```

### 3 - Install Dependencies in backend folder

```
cd backend
npm install
```

### 4 - Run application

```
# Run from root folder :
npm run start
```

```
You can now view your application on localhost:3000
```

### 4.1 - You can also run the backend separately, if you don't see any reports on the dashboard
## In a seperate Terminal run :
```
cd backend
npm run start
```

```
You can now refresh your application on localhost:3000
```

### To generate new report data

```
# Make an API call directly from your browser to :
http://localhost:8000/newReport
```
