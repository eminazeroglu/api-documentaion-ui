# API Documentation Interface

Bu layihə API sənədləşdirməsini interaktiv şəkildə göstərmək və test etmək üçün yaradılmış veb interfeys sistemidir. Bu sistem sizə API endpointlərinizi sənədləşdirməyə və test etməyə imkan verir.

## Xüsusiyyətlər

- 🌓 Dark/Light Mode
- 🔍 Real-time axtarış
- 📝 API endpoint detalları
- 🧪 Built-in API test interfeysi
- 🔐 Token əsaslı autentifikasiya
- 📱 Responsive dizayn

## Quraşdırma

1. Repo-nu klonlayın:
```bash
git clone https://github.com/your-username/api-docs.git
```

2. Layihə qovluğuna keçin:
```bash
cd api-docs
```

3. `index.html` faylını brauzerdə açın və ya hər hansı statik fayl serveri ilə işə salın:
```bash
# Python ilə
python -m http.server 8000

# və ya Node.js ilə
npx serve
```

## JSON Strukturu

API dokumentasiyası üçün JSON strukturu aşağıdakı kimi olmalıdır:

```json
{
    "config": {
        "info": {
            "title": "API Documentation",
            "version": "1.0.0",
            "description": "API Documentation"
        },
        "servers": [
            {
                "url": "https://api.example.com",
                "description": "API Server"
            }
        ],
        "authorization": "bearerToken"
    },
    "elements": [
        {
            "tag": "Users",
            "description": "User endpoints",
            "endpoints": {
                "/users": {
                    "get": {
                        "summary": "Get users list",
                        "description": "Returns list of users",
                        "authorization": true,
                        "query": {
                            "search": {
                                "type": "text",
                                "description": "Search query"
                            },
                            "page": {
                                "type": "number",
                                "description": "Page number",
                                "default": 1
                            }
                        },
                        "response": {
                            "data": [
                                {
                                    "id": 1,
                                    "name": "John Doe",
                                    "email": "john@example.com"
                                }
                            ],
                            "total": 50
                        }
                    },
                    "post": {
                        "summary": "Create user",
                        "description": "Creates a new user",
                        "authorization": true,
                        "formBody": {
                            "name": {
                                "type": "text",
                                "required": true,
                                "description": "User's name"
                            },
                            "email": {
                                "type": "text",
                                "required": true,
                                "description": "User's email"
                            }
                        },
                        "response": {
                            "200": {
                                "id": 1,
                                "name": "John Doe",
                                "email": "john@example.com"
                            },
                            "422": {
                                "name": "Name is required",
                                "email": "Email is required"
                            }
                        }
                    }
                }
            }
        }
    ]
}
```

## JSON Strukturunun Açıqlaması

### 1. Config Bölməsi
- `info`: API haqqında əsas məlumatlar
  - `title`: API başlığı
  - `version`: API versiyası
  - `description`: API təsviri
- `servers`: API server məlumatları
- `authorization`: Autentifikasiya tipi (məsələn: "bearerToken")

### 2. Elements Bölməsi
- `tag`: Endpoint qrupu adı
- `description`: Qrup təsviri
- `endpoints`: API endpoint-ləri

### 3. Endpoint Strukturu
- Path key kimi verilir (məsələn: "/users")
- HTTP metodları (get, post, put, delete) alt açar kimi verilir
- Hər metod üçün:
  - `summary`: Qısa təsvir
  - `description`: Ətraflı təsvir
  - `authorization`: Token tələb olunub-olunmaması
  - `query`: Query parametrləri (GET sorğuları üçün)
  - `formBody`: Request body parametrləri (POST, PUT sorğuları üçün)
  - `response`: Nümunə cavablar

## İstifadə

1. **API Sənədləşdirməsini Əlavə Etmək**
   - JSON faylınızı hazırlayın
   - Fayl yolunu `env.js`-də göstərin:
   ```javascript
   export const ENV = {
       documentationURL: 'path/to/your/documentation.json',
       baseURL: 'your-api-base-url'
   }
   ```

2. **Token İdarəetməsi**
   - "Add Token" düyməsini kliklə açılan pəncərədən token əlavə edin
   - Token localStorage-də saxlanılır
   - "Logout" düyməsi ilə tokeni silə bilərsiniz

3. **API Test**
   - Sol paneldən endpoint seçin
   - Sağ test panelindən:
     - Headers əlavə edin
     - Query parametrləri doldurun
     - Request body-ni yazın
     - "Send Request" düyməsini klikləyin

4. **Axtarış**
   - Yuxarıdakı axtarış sahəsindən API-ları axtarın
   - Path, summary və description-a görə axtarış edilir
   - Axtarış real-time aparılır

## Texniki Detallar

### Komponentlər:
1. **DocumentConfig**: API haqqında əsas məlumatları göstərir
2. **Sidebar**: API endpointlərinin siyahısı və axtarış
3. **MainContent**: Seçilmiş endpoint haqqında ətraflı məlumat
4. **TestPanel**: API test interfeysi

### State Management:
- Token statusu localStorage-də saxlanılır
- Tema seçimi localStorage-də saxlanılır
- State management sadə event sistemi ilə idarə olunur

### CSS:
- Tailwind CSS istifadə olunur
- Dark/Light mode üçün tam dəstək
- Responsive dizayn

## Tövsiyyələr

1. **JSON Strukturu**
   - Bütün məcburi sahələri doldurun
   - Düzgün tiplərdən istifadə edin
   - Aydın təsvirlər yazın

2. **API Test**
   - Authorization tələb edən endpoint-lər üçün token əlavə edin
   - Query parametrlərini test edərkən müxtəlif halları yoxlayın
   - Response-ları diqqətlə yoxlayın

## Contributing

Layihəyə töhfə vermək üçün:
1. Fork edin
2. Feature branch yaradın
3. Commit edin
4. Push edin
5. Pull request açın

## Lisenziya

MIT