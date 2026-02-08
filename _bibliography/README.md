# Publications 관리 워크플로우

## 새 논문 추가 (3단계)

1. **Google Scholar**에서 논문 검색 → 인용 버튼(") 클릭 → **BibTeX** 선택
2. 복사한 내용을 **`papers.bib`** 파일 맨 아래에 붙여넣기
3. 저장 → 끝

## 자동 처리

- **본인 이름**: `_config.yml`의 `scholar.first_name`, `scholar.last_name`에 등록된 이름만 자동으로 **bold** 처리
- **제목 링크**: `url`, `website`, 또는 `pdf` 필드가 있으면 제목 클릭 시 해당 링크로 이동

## 선택 사항 (붙여넣은 뒤 원하면 추가)

| 필드 | 설명 |
|------|------|
| `url` 또는 `website` | 논문 온라인 링크 (제목 클릭 시 이동) |
| `pdf` | 로컬 PDF 파일명 (예: `my-paper.pdf` → `assets/pdf/` 폴더에 저장) |

Google Scholar BibTeX에는 `url`이 없을 수 있음. 필요하면 수동으로 추가:

```
url = {https://arxiv.org/abs/...}
```

또는

```
website = {https://...}
```

## 이름 변형 추가

`In-Young`, `In Young` 등 다른 표기로 나오면 `_config.yml`의 `scholar.first_name`에 추가:

```yaml
first_name: [Inyoung, I., "In-Young", "In Young"]
```
