# AgroScan UML & System Diagrams

This document contains the UML and system architecture diagrams for the AgroScan project, written in **Mermaid** syntax. You can view these interactively inside VS Code (using the Markdown Preview) or directly on GitHub.

---

## 1. Use Case Diagram
This diagram shows the interactions between the **Farmer / User** and the AgroScan system.

```mermaid
graph TD
    %% Actors
    User((Farmer / User))
    
    %% System Boundary
    subgraph AgroScan System
        UC1(Register / Login)
        UC2(Update Account Settings)
        UC3(Capture Leaf Image via Camera)
        UC4(Upload Leaf Image from Gallery)
        UC5(Diagnose Crop Disease via AI)
        UC6(View Treatment & Prevention Tips)
        UC7(View Historical Scans)
        UC8(Manage Farms & Crop Areas)
        UC9(Submit Support Tickets)
    end
    
    %% Relationships
    User --> UC1
    User --> UC2
    User --> UC3
    User --> UC4
    User --> UC5
    User --> UC6
    User --> UC7
    User --> UC8
    User --> UC9
    
    UC3 -.->|include| UC5
    UC4 -.->|include| UC5
    UC5 -.->|include| UC6
```

---

## 2. Class Diagram
This diagram outlines the logical components and classes of the Flask Backend API and the React Native Mobile app.

```mermaid
classDiagram
    class FlaskAPI {
        +app: Flask
        +get_db_connection() Connection
        +init_db_and_seed()
        +home() Template
        +health() JSON
        +predict() JSON
        +get_scans() JSON
        +register() JSON
        +login() JSON
        +add_farm() JSON
        +get_farms() JSON
        +create_support_ticket() JSON
    }

    class PyTorchModel {
        +model: ResNet34
        +classes: List~string~
        +transform: Compose
        +predict_image(image_bytes) tuple~string, float~
    }

    class Database {
        +conn: Connection
        +init_db_and_seed()
        +parse_prevention_html(raw_html)
    }

    class MobileApp {
        +NavigationStack: Router
        +useTheme() Object
        +useColorScheme() string
    }

    class AuthProvider {
        +user: Object
        +login(email, password) boolean
        +register(username, email, password) boolean
        +logout()
    }

    class APIService {
        +predict(imageUri) Object
        +fetchHistory(userId) List
        +fetchFarms(userId) List
        +submitTicket(userId, subject, message) Object
    }

    FlaskAPI --> PyTorchModel : Uses for Inference
    FlaskAPI --> Database : Queries/Inserts
    MobileApp --> AuthProvider : Authenticates sessions
    MobileApp --> APIService : Makes HTTP Requests
    APIService --> FlaskAPI : Communicates via JSON/REST
```

---

## 3. Sequence Diagram (Scan & Diagnosis Flow)
This diagram illustrates the step-by-step communication process when a user scans a leaf.

```mermaid
sequenceDiagram
    autonumber
    actor User as Farmer / User
    participant App as Mobile App (Expo)
    participant API as Flask Backend
    participant DB as PostgreSQL
    participant Model as ResNet34 Model

    User->>App: Captures leaf photo or selects from Gallery
    App->>User: Displays selected image preview
    User->>App: Taps "Analyze"
    App->>API: POST /predict (image file, user_id)
    Note over API: Server reads image bytes
    API->>Model: predict_image(image_bytes)
    Note over Model: Run ResNet34 CNN inference
    Model-->>API: Returns (predicted_class, confidence)
    API->>API: Fetch crop name, disease cause, and prevention steps
    API->>DB: INSERT INTO scans (user_id, image_path, crop_type, predicted_disease, confidence)
    DB-->>API: Confirm Scan Saved
    API-->>App: Returns JSON (crop, disease, cause, prevention, confidence)
    App->>User: Navigates to Result Screen with beautiful detailed diagnostics
```

---

## 4. Entity Relationship Diagram (ERD)
This diagram shows the complete relational schema of your active **PostgreSQL** database.

```mermaid
erDiagram
    users ||--o{ scans : "performs"
    users ||--o{ farms : "manages"
    users ||--o{ support_tickets : "submits"
    treatments ||--o{ scans : "describes"
    
    users {
        uuid id PK "Primary Key (Auto UUID)"
        varchar username "User's display name"
        varchar email UK "Unique login email"
        varchar password_hash "SHA-256 hashed password"
        timestamp created_at "Registration date"
    }
    
    scans {
        uuid id PK "Primary Key (Auto UUID)"
        uuid user_id FK "References users.id (nullable)"
        varchar image_path "Local server path to uploaded leaf image"
        varchar crop_type "Name of crop (e.g. Tomato)"
        varchar predicted_disease FK "References treatments.disease_key"
        numeric confidence "Prediction confidence percentage"
        timestamp created_at "Inference scan date"
    }
    
    treatments {
        varchar disease_key PK "Primary Key (e.g. Tomato___Bacterial_spot)"
        varchar crop "Crop category name"
        varchar disease_name "Friendly name of disease"
        text cause "Biological cause description"
        text[] prevention_steps "Array of prevention guidelines"
        timestamp created_at "Creation timestamp"
    }

    farms {
        uuid id PK "Primary Key (Auto UUID)"
        uuid user_id FK "References users.id"
        varchar name "Farm or field name"
        varchar crop_type "Predominant crop planted"
        varchar area_size "Size of farm (e.g. 5 acres)"
        timestamp created_at "Farm creation date"
    }

    support_tickets {
        uuid id PK "Primary Key (Auto UUID)"
        uuid user_id FK "References users.id (nullable)"
        varchar subject "Ticket header subject"
        text message "Full description details"
        timestamp created_at "Ticket submission date"
    }
```

---

## How to Render and View These Diagrams

1. **In VS Code (Recommended)**:
   * Open this file (`docs/diagrams.md`).
   * Press **`Ctrl + Shift + V`** (or click the **Open Preview** button in the top right corner of VS Code).
   * VS Code will automatically render all the Mermaid diagrams interactively!

2. **On GitHub**:
   * Simply push this file to your GitHub repository. GitHub natively renders Mermaid blocks inside markdown files directly in the browser.

3. **Mermaid Live Editor**:
   * Copy the code block starting with ````mermaid` and paste it into the [Mermaid Live Editor](https://mermaid.live).
