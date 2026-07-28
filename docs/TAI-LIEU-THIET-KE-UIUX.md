# TÀI LIỆU THIẾT KẾ UI/UX — WEBSITE CCHC

**Áp dụng khung Kiến trúc Thông tin (Information Architecture) của O'Reilly**
*(Louis Rosenfeld & Peter Morville — "Information Architecture for the World Wide Web" — "Polar Bear Book")*

| | |
|---|---|
| **Sản phẩm** | Cổng thông tin CCHC — Trung tâm Truyền thông và Chăm sóc Sức khỏe Cộng đồng |
| **Loại hình** | Website chính trị – chính sách (đơn vị trực thuộc Tổng hội Y học Việt Nam) |
| **Trọng tâm chiến lược** | **Hậu thuẫn thể chế & Thẩm quyền** — làm nổi bật *quyền lực bảo chứng* đứng sau mọi nội dung |
| **Phiên bản tài liệu** | 1.0 — Bản định hướng giao diện (demo) |
| **Ngôn ngữ giao diện** | Tiếng Việt (`lang="vi"`) |

---

## 0. Tóm tắt điều hành (Executive Summary)

CCHC không phải một trang tin sức khỏe thông thường. Đây là **cơ quan phát ngôn có thẩm quyền**: một đơn vị trực thuộc **Tổng hội Y học Việt Nam**, được **các hội chuyên khoa** và **Hội đồng khoa học** bảo chứng về mặt chuyên môn. Vì vậy, khác biệt cạnh tranh cốt lõi của sản phẩm không nằm ở lượng nội dung, mà ở **quyền lực hậu thuẫn (institutional backing power)** — thứ khiến người dân, nhà báo và tổ chức tin rằng "nguồn này là nguồn gốc".

Toàn bộ Kiến trúc Thông tin trong tài liệu này được thiết kế để **liên tục phơi bày và củng cố lớp hậu thuẫn thể chế đó** ở mọi điểm chạm: từ hệ thống tổ chức, hệ thống nhãn, hệ thống điều hướng đến hệ thống tìm kiếm. Mỗi quyết định IA đều trả lời một câu hỏi: *"Cấu trúc này có làm cho thẩm quyền phía sau CCHC dễ nhìn thấy và dễ kiểm chứng hơn không?"*

Tài liệu tuân theo khung của Rosenfeld & Morville:
1. **Ba vòng tròn IA**: Bối cảnh (Context) – Nội dung (Content) – Người dùng (Users)
2. **Bốn hệ thống IA**: Tổ chức – Nhãn – Điều hướng – Tìm kiếm
3. **Siêu dữ liệu & từ vựng có kiểm soát** (Metadata & Controlled Vocabularies)
4. **Tài liệu hóa thiết kế** (Blueprints, Wireframes, Content Models)

---

## 1. BA VÒNG TRÒN CỦA KIẾN TRÚC THÔNG TIN

> Theo Rosenfeld & Morville, một IA tốt sống ở giao điểm của ba vòng tròn: **Context – Content – Users**. Không có "IA đúng" tuyệt đối; chỉ có IA phù hợp với ba yếu tố này.

### 1.1. Bối cảnh (Context) — *nơi quyền lực hậu thuẫn được định nghĩa*

| Yếu tố | Mô tả |
|---|---|
| **Sứ mệnh** | Trở thành **nguồn phát ngôn gốc, đáng tin cậy** về sức khỏe — nơi người dân tìm đến *trước khi* hoang mang vì thông tin trôi nổi. |
| **Tư cách pháp lý** | Đơn vị trực thuộc **Tổng hội Y học Việt Nam**; hoạt động phi thương mại, tuân thủ pháp luật về thông tin y tế và bảo vệ dữ liệu cá nhân. |
| **Quyền lực hậu thuẫn (điểm nhấn trọng tâm)** | Bốn tầng bảo chứng xếp chồng:<br>① **Tổng hội Y học Việt Nam** (cơ quan chủ quản)<br>② **Các hội chuyên khoa thành viên** (phản biện chuyên môn)<br>③ **Hội đồng khoa học** (thẩm định)<br>④ **Chuyên gia phản biện ghi rõ tên** (chịu trách nhiệm cá nhân) |
| **Bản chất chính trị** | Là "cánh tay truyền thông" của Tổng hội, CCHC diễn giải **chính sách y tế & văn bản pháp luật** thành nội dung dân hiểu. Do đó website mang tính chính trị – chính sách, đòi hỏi chuẩn mực về **thẩm quyền, trung lập và minh bạch** cao hơn trang tin thường. |
| **Ràng buộc** | Không được để hình ảnh "thương mại hóa" làm loãng thẩm quyền; ranh giới độc lập chuyên môn với nhà tài trợ phải luôn hiển thị. |
| **Ngân sách niềm tin** | Tài sản quý nhất là *uy tín thể chế*. Mọi lỗi minh bạch đều rút thẳng từ "ngân sách" này. |

**Hệ quả cho IA:** Bối cảnh này quy định rằng **thẩm quyền không phải là một trang "Giới thiệu" nằm cuối menu — nó là một lớp bề mặt trải khắp toàn site (persistent authority layer).**

### 1.2. Nội dung (Content)

Kiểm kê nội dung theo mô hình **"content facets"** của O'Reilly (định dạng · độ động · quyền sở hữu):

| Nhóm nội dung | Ví dụ | Độ động | "Vân tay" thẩm quyền |
|---|---|---|---|
| **Tri thức đã thẩm định** | Hồ sơ chủ đề, bài viết M1–M4, video/audio, bóc tách hiểu sai, "khi nào cần đi khám", FAQ | Trung bình | Nhãn mức bằng chứng + tên chuyên gia phản biện |
| **Tin tức & Sự kiện** | Tin hoạt động, lịch hội thảo, thông cáo, tóm tắt sau sự kiện | Cao | Gắn với sự kiện có thật, tài liệu tải về |
| **Tổng hội & Chính sách** | Vai trò Tổng hội, hồ sơ hội chuyên khoa, giải mã chính sách, văn bản đáng chú ý, đối thoại chính sách | Thấp–TB | **Lõi hậu thuẫn thể chế** — trích số hiệu, ngày hiệu lực, link văn bản gốc |
| **Mạng lưới chuyên gia** | Thư viện chuyên gia (lọc theo chuyên khoa), hồ sơ chuyên gia | Thấp | Học hàm/học vị, hội trực thuộc, kê khai COI |
| **Báo chí** | Thông cáo, media kit, chuyên gia nhận phỏng vấn, kiểm chứng & đính chính | TB | Nguồn chính thống, phản hồi nhanh |
| **Hợp tác & Dịch vụ** | Tư vấn truyền thông, phản biện chuyên môn, đào tạo, chương trình cộng đồng, dịch vụ KHCN | Thấp | Ranh giới độc lập chuyên môn |
| **Minh bạch & Trách nhiệm** | Chính sách biên tập, quy trình 8 bước, tài trợ & COI, AI có kiểm soát, miễn trừ y tế, nhật ký đính chính | Thấp | **Bộ máy "giới hạn quyền lực"** bảo vệ thẩm quyền |
| **Về CCHC** | Tư cách pháp lý, quan hệ với Tổng hội, tầm nhìn–sứ mệnh, hội đồng khoa học, năng lực cốt lõi | Thấp | Tuyên bố hậu thuẫn ở cấp cao nhất |

**Content model then chốt — "Đơn vị nội dung có thẩm quyền":** mỗi bài xuất bản mang các thuộc tính bắt buộc:
`chủ đề` · `mức bằng chứng M1–M4` · `chuyên gia phản biện (tên)` · `ngày thẩm định` · `khai báo tài trợ/COI` · `câu miễn trừ y tế` · `trạng thái đính chính`.

### 1.3. Người dùng (Users)

Bốn nhóm chính, mỗi nhóm có "nhu cầu thẩm quyền" khác nhau:

| Chân dung | Mục tiêu | Câu hỏi thẩm quyền họ đặt ra | Ưu tiên IA |
|---|---|---|---|
| **Người dân / bệnh nhân & người nhà** (gồm **người cao tuổi**) | Hiểu đúng, biết khi nào đi khám | *"Cái này ai nói? Có đáng tin không?"* | Trust strip, nhãn M1–M4, cỡ chữ vùng đọc điều chỉnh được (18→20→22) |
| **Nhà báo** | Nguồn chính thống, phản hồi nhanh, trích dẫn được | *"Đây có phải nguồn gốc chính thức không?"* | Thông cáo tải không cần đăng nhập, media kit, chuyên gia nhận phỏng vấn |
| **Tổ chức / đối tác** | Hợp tác truyền thông, phản biện, đào tạo | *"Ranh giới độc lập chuyên môn ở đâu?"* | Trang hợp tác nêu rõ vai trò & giới hạn từng đối tác |
| **Chuyên gia / hội chuyên khoa** | Tham gia thẩm định, thể hiện uy tín | *"Đóng góp của tôi có được ghi nhận đúng không?"* | Ghi tên phản biện, hồ sơ hội chuyên khoa |

> **Nguyên tắc người dùng xuyên suốt:** thiết kế cho **người đọc hoài nghi**. Mọi khẳng định sức khỏe phải kèm bằng chứng về *ai* đứng sau nó — đây chính là nơi "quyền lực hậu thuẫn" phục vụ trực tiếp trải nghiệm người dùng.

---

## 2. HỆ THỐNG TỔ CHỨC (Organization Systems)

> O'Reilly phân biệt **sơ đồ tổ chức** (organization schemes) và **cấu trúc tổ chức** (organization structures).

### 2.1. Sơ đồ tổ chức — *Hybrid có định hướng thẩm quyền*

CCHC dùng **sơ đồ lai (hybrid scheme)**, kết hợp:

- **Theo chủ đề (topical):** Tri thức, Chủ đề sức khỏe — phục vụ người dân.
- **Theo đối tượng (audience-based):** Báo chí, Hợp tác & Dịch vụ — phục vụ nhà báo và tổ chức.
- **Theo thẩm quyền/tổ chức (organizational-authority):** *Tổng hội & Chính sách*, *Minh bạch*, *Về CCHC* — **đây là trục làm nổi bật hậu thuẫn thể chế**, được nâng lên ngang hàng menu chính thay vì giấu ở footer.

> **Quyết định IA cốt lõi:** đưa "Tổng hội & Chính sách" và "Minh bạch" thành **mục cấp 1** trên thanh điều hướng. Ở đa số website, khối "về tổ chức/pháp lý" bị đẩy xuống chân trang; ở CCHC, chúng là *tuyên ngôn quyền lực* nên phải ở tuyến đầu.

### 2.2. Cấu trúc tổ chức — *Phân cấp nông + Siêu văn bản*

- **Hệ thống phân cấp (hierarchy):** rộng và nông (7 nhánh chính, tối đa 2 cấp con) — giảm tải nhận thức, đặc biệt cho người cao tuổi.
- **Cấu trúc siêu văn bản (hypertext):** các "cầu nối thẩm quyền" nối ngang giữa bài viết → chuyên gia phản biện → hội chuyên khoa → quy trình 8 bước. Người dùng có thể "truy nguyên" bất kỳ khẳng định nào về tận gốc thể chế.
- **Cơ sở dữ liệu (database model):** Thư viện tri thức và Thư viện chuyên gia là các tập hợp có **facet lọc** (chủ đề, mức bằng chứng, chuyên khoa).

### 2.3. Sơ đồ trang (Blueprint / Sitemap)

```
CCHC (Trang chủ)
│  [Utility: Bản đồ nội dung · Liên hệ · Tìm kiếm · Đăng nhập · Đăng ký]
│
├─ 1. TRI THỨC ......................... (topical)
│   ├─ Hồ sơ chủ đề
│   ├─ Bài viết dễ hiểu (lọc M1–M4)
│   ├─ Video & audio
│   ├─ Bóc tách hiểu sai
│   ├─ Khi nào cần đi khám
│   └─ Câu hỏi thường gặp & tài liệu
│
├─ 2. TIN TỨC & SỰ KIỆN ................ (topical/thời sự)
│   ├─ Tin hoạt động
│   ├─ Lịch hội thảo
│   ├─ Thông cáo
│   └─ Tóm tắt sau sự kiện
│
├─ 3. TỔNG HỘI & CHÍNH SÁCH ★ ......... (AUTHORITY / hậu thuẫn thể chế)
│   ├─ Tổng hội Y học Việt Nam
│   ├─ Hội chuyên khoa
│   ├─ Chính sách y tế (giải mã)
│   ├─ Văn bản đáng chú ý (số hiệu · hiệu lực · link gốc)
│   ├─ Mạng lưới chuyên gia
│   └─ Đối thoại chính sách
│
├─ 4. BÁO CHÍ .......................... (audience: nhà báo)
│   ├─ Thông cáo báo chí
│   ├─ Bộ nhận diện & tư liệu (media kit)
│   ├─ Chuyên gia nhận phỏng vấn
│   └─ Kiểm chứng & đính chính
│
├─ 5. HỢP TÁC & DỊCH VỤ ................ (audience: tổ chức)
│   ├─ Tư vấn truyền thông sức khỏe
│   ├─ Phản biện chuyên môn (2 loại, tách bạch)
│   ├─ Đào tạo & tập huấn
│   ├─ Chương trình cộng đồng
│   ├─ Dịch vụ chuyên môn & hợp tác KHCN
│   ├─ Đối tác & giới hạn hợp tác
│   └─ Gửi yêu cầu hợp tác
│
├─ 6. MINH BẠCH ★ ..................... (AUTHORITY / giới hạn quyền lực)
│   ├─ Chính sách biên tập (quy trình 8 bước)
│   ├─ Tài trợ & xung đột lợi ích (COI)
│   ├─ AI có kiểm soát
│   ├─ Miễn trừ y tế
│   └─ Đính chính & phản ánh (nhật ký 4 trạng thái)
│
└─ 7. VỀ CCHC ★ ....................... (AUTHORITY / tuyên bố hậu thuẫn)
    ├─ CCHC là ai (tư cách pháp lý)
    ├─ Tầm nhìn – Sứ mệnh
    ├─ Hội đồng khoa học
    └─ Năng lực cốt lõi

★ = Ba nhánh mang tải trọng "quyền lực hậu thuẫn". Chiếm 3/7 mục cấp 1 — tỉ trọng có chủ đích.
```

---

## 3. HỆ THỐNG NHÃN (Labeling Systems)

> Nhãn là cách IA "nói ngôn ngữ của người dùng" đồng thời phát tín hiệu thẩm quyền. O'Reilly nhấn mạnh **tính nhất quán** và **từ vựng có kiểm soát**.

### 3.1. Nhãn điều hướng theo ngữ cảnh (contextual)

Dùng từ ngữ **dân hiểu** cho nhóm phục vụ người dân ("Bạn đang cần gì hôm nay?", "Khi nào cần đi khám"), nhưng dùng **từ vựng thể chế chuẩn xác** cho trục thẩm quyền ("Tổng hội", "Hội chuyên khoa", "Văn bản đáng chú ý", "Đối thoại chính sách"). Sự song ngữ có kiểm soát này vừa gần gũi vừa uy tín.

### 3.2. Hệ nhãn thẩm quyền (Authority iconography & vocabulary) — *trọng tâm*

| Nhãn / Tín hiệu | Ý nghĩa | Vị trí |
|---|---|---|
| **Trust strip** | Dải xác nhận "nguồn chính thống" ngay dưới hero | Trang chủ, đầu bài viết |
| **Nhãn mức bằng chứng M1–M4** | Phân loại độ mạnh bằng chứng của mỗi nội dung | Thẻ bài, đầu bài viết, bộ lọc thư viện |
| **"Đã thẩm định" / badge kiểm chứng** | Nội dung đã qua hội đồng khoa học | Thẻ nội dung |
| **Chuỗi logo hậu thuẫn** | Logo Tổng hội & các hội chuyên khoa chạy ở hero | Hero trang chủ (`hero-logos`) |
| **Ghi tên chuyên gia phản biện** | Chịu trách nhiệm cá nhân, có thật | Cuối mỗi bài |
| **Con dấu quy trình 8 bước** | Mọi bài đều đi qua quy trình biên soạn 8 bước | Bài viết → link Minh bạch |
| **Nhãn khai báo COI** | Công khai xung đột lợi ích | Hồ sơ chuyên gia, bài có tài trợ |

### 3.3. Từ vựng có kiểm soát cho mức bằng chứng (Controlled Vocabulary)

```
M1 — Bằng chứng mạnh   (khuyến cáo/hướng dẫn, tổng quan hệ thống)
M2 — Bằng chứng khá    (nghiên cứu chất lượng, đồng thuận chuyên gia)
M3 — Bằng chứng hạn chế (dữ liệu sơ bộ, cần thận trọng)
M4 — Thông tin định hướng / bối cảnh (chưa đủ mạnh để khuyến cáo)
```

Quy tắc: **một khái niệm = một nhãn**. "Mức bằng chứng" không được lúc gọi "độ tin cậy", lúc gọi "cấp độ" — tránh phá vỡ tính có kiểm soát của từ vựng.

### 3.4. Nhãn cảnh báo & an toàn (Semantic/Emergency labels)

- Màu **coral (#C0392B)** dành **riêng** cho nguy cơ/khẩn cấp (dấu hiệu cấp cứu, red-flag, lỗi consent) — không dùng cho trang trí. Đây là nhãn ngữ nghĩa: đỏ = "dừng lại/nguy hiểm".
- Câu **miễn trừ y tế** là một nhãn văn bản chuẩn, áp dụng cho mọi nội dung.

---

## 4. HỆ THỐNG ĐIỀU HƯỚNG (Navigation Systems)

> Điều hướng giúp người dùng trả lời: *Tôi đang ở đâu? Tôi có thể đi đâu?* — và ở CCHC, thêm một câu thứ ba: *Ai bảo chứng cho nơi tôi đang đứng?*

### 4.1. Điều hướng toàn cục (Global navigation) — *Header hai tầng*

- **Tầng 1 – Utility bar (nền navy = thẩm quyền):** Bản đồ nội dung · Liên hệ · Tìm kiếm · Đăng nhập · Đăng ký. Màu navy đậm phát tín hiệu "cơ quan chính thống".
- **Tầng 2 – Main nav:** logo CCHC + 7 mục cấp 1 với **mega-menu** mô tả từng mục con (giảm đoán mò).
- **Sticky:** header luôn dính trên đầu → **lớp thẩm quyền hiện diện thường trực** khi cuộn.

### 4.2. Điều hướng cục bộ & ngữ cảnh (Local & Contextual)

- **Breadcrumb** (`crumb`): định vị người dùng trong phân cấp, đồng thời phơi bày chuỗi thể chế (vd: *Minh bạch › COI & AI có kiểm soát*).
- **Backbar "← Quay lại"**: hỗ trợ mô hình duyệt tuyến tính cho người cao tuổi.
- **"Cầu nối thẩm quyền" (contextual links):** trong mỗi bài, liên kết dẫn tới *chuyên gia phản biện → hội chuyên khoa → quy trình 8 bước*. Đây là điều hướng **truy nguyên nguồn gốc** — đặc sản IA của một site thẩm quyền.
- **Khối "Tìm hiểu thêm" / "next-safe"** ở cuối trang: dẫn người đọc sang bằng chứng minh bạch, khép vòng niềm tin.

### 4.3. Điều hướng bổ trợ (Supplemental)

- **Bản đồ nội dung (Content Map / Sitemap overlay):** truy cập từ utility bar — cung cấp cái nhìn toàn cảnh cấu trúc, đúng tinh thần "supplemental navigation" của O'Reilly.
- **Home tabs / carousel sự kiện:** điều hướng theo mối quan tâm trên trang chủ.
- **Footer:** nhắc lại các trục thẩm quyền (Minh bạch, Về CCHC, Tổng hội) — *củng cố* chứ không phải *cất giấu* chúng.

### 4.4. Điều hướng di động & khả năng tiếp cận

- Menu-toggle + subtoggle cho mega-menu trên mobile.
- **Cỡ chữ vùng đọc điều chỉnh runtime (18→20→22px)** cho người cao tuổi — một quyết định điều hướng-nội dung phục vụ nhóm dân hoài nghi & thị lực yếu.
- Tương phản màu đạt AA (meta `--muted` đã ghi chú "AA trên nền trắng").

---

## 5. HỆ THỐNG TÌM KIẾM (Searching Systems)

> Tìm kiếm là "kế hoạch B" khi duyệt thất bại — nhưng với người dân hoang mang, nó thường là **kế hoạch A**.

| Khía cạnh | Thiết kế |
|---|---|
| **Điểm vào tìm kiếm** | Ô tìm ở hero ("Tìm chủ đề: tiểu đường, huyết áp, tiêm chủng…"), nút tìm ở cả 2 tầng header, overlay tìm kiếm cho mobile. |
| **Vùng tìm kiếm (search zones)** | Ưu tiên **Tri thức đã thẩm định** — kết quả nên gắn nhãn M1–M4 để người dùng đánh giá thẩm quyền ngay trên trang kết quả. |
| **Bộ lọc theo facet** | Thư viện tri thức lọc theo *chủ đề* + *mức bằng chứng*; Thư viện chuyên gia lọc theo *chuyên khoa*. |
| **Trạng thái rỗng (empty state)** | Thông báo "Không có bài viết khớp bộ lọc" + hành động "Xóa bộ lọc" — tránh ngõ cụt. |
| **Gợi ý truy vấn** | Placeholder dùng từ khóa dân dã (huyết áp, tiêm chủng) để bắc cầu ngôn ngữ người dùng ↔ từ vựng chuyên môn. |
| **Kết quả có tín hiệu thẩm quyền** | Mỗi kết quả kèm badge "đã thẩm định" + tên chuyên gia → tìm kiếm cũng phục vụ mục tiêu hậu thuẫn. |

**Khuyến nghị nâng cao (roadmap):** best bets cho các truy vấn nhạy cảm (vd "sốt xuất huyết", "vaccine") trỏ thẳng tới hồ sơ chủ đề M1; đồng nghĩa (thesaurus) nối "cao huyết áp" ↔ "tăng huyết áp".

---

## 6. SIÊU DỮ LIỆU & TỪ VỰNG CÓ KIỂM SOÁT (Metadata & Controlled Vocabularies)

> "IA vô hình": lớp metadata quyết định chất lượng tìm kiếm, lọc và liên kết ngang.

**Lược đồ metadata cho một "Đơn vị nội dung có thẩm quyền":**

| Trường | Loại từ vựng | Ví dụ giá trị |
|---|---|---|
| `chu_de` | Danh mục có kiểm soát | Tim mạch, Đái tháo đường, Tiêm chủng, Sức khỏe tâm thần… |
| `muc_bang_chung` | Từ vựng đóng | M1 / M2 / M3 / M4 |
| `dinh_dang` | Từ vựng đóng | Bài viết / Video / Audio / Infographic |
| `chuyen_gia_phan_bien` | Danh mục (liên kết hồ sơ) | PGS.TS Nguyễn Văn An … |
| `hoi_chuyen_khoa` | Danh mục (liên kết hồ sơ) | Hội Tim mạch học Việt Nam … |
| `ngay_tham_dinh` | Ngày | 2026-… |
| `khai_bao_tai_tro_coi` | Boolean + văn bản | Có/Không + nội dung công khai |
| `trang_thai_dinh_chinh` | Từ vựng đóng (4 trạng thái) | Nguyên bản / Đã cập nhật / Đã đính chính / Thu hồi |
| `mien_tru_y_te` | Văn bản chuẩn | (câu miễn trừ áp dụng chung) |

**Quan hệ (thesaurus/associative):** đồng nghĩa (cao huyết áp ↔ tăng huyết áp), phân cấp (Tim mạch ⊃ Tăng huyết áp), liên kết (bài ↔ chuyên gia ↔ hội ↔ văn bản chính sách). Chính lớp quan hệ này biến "hậu thuẫn thể chế" từ khẩu hiệu thành **cấu trúc dữ liệu điều hướng được**.

---

## 7. PHƠI BÀY "QUYỀN LỰC HẬU THUẪN" QUA IA — *(Mục trọng tâm)*

Tổng hợp cách bốn hệ thống IA đồng loạt phục vụ mục tiêu thẩm quyền:

| Tầng hậu thuẫn | Tổ chức | Nhãn | Điều hướng | Tìm kiếm |
|---|---|---|---|---|
| **① Tổng hội Y học VN** | Nhánh cấp 1 "Tổng hội & Chính sách" | Logo trong hero, nhãn "cơ quan chủ quản" | Breadcrumb, footer nhắc lại | Best bet cho "Tổng hội" |
| **② Hội chuyên khoa** | Mục con "Hội chuyên khoa" | Tên hội gắn mỗi bài | Cầu nối bài → hội | Facet lọc chuyên khoa |
| **③ Hội đồng khoa học** | Trong "Về CCHC" | Badge "đã thẩm định" | Link từ bài → quy trình | Gắn nhãn kết quả |
| **④ Chuyên gia (tên thật)** | "Mạng lưới chuyên gia" | Ghi tên phản biện + COI | Hồ sơ chuyên gia liên kết | Thư viện chuyên gia có lọc |

**Nguyên tắc "một cú chạm tới thẩm quyền":** từ bất kỳ nội dung nào, người dùng chỉ cần **một thao tác** để nhìn thấy *ai bảo chứng* và *bằng chứng ở đâu*. Đây là chỉ số thành công IA đặc thù của CCHC.

**Cân bằng quyền lực – trách nhiệm:** hậu thuẫn thể chế (nhánh *Tổng hội & Chính sách*) luôn được đặt cạnh bộ máy *giới hạn quyền lực* (nhánh *Minh bạch*: COI, AI có kiểm soát, nhật ký đính chính). IA cố ý để hai lực này hiển thị song song — thẩm quyền mà **không kèm** minh bạch sẽ bị người đọc hoài nghi bác bỏ.

---

## 8. HỆ THỐNG THỊ GIÁC HỖ TRỢ IA (Visual System)

Màu sắc được dùng như **tín hiệu ngữ nghĩa**, không trang trí:

| Token | Mã | Vai trò ngữ nghĩa |
|---|---|---|
| `--navy` | `#012932` | **Thẩm quyền** — hero, footer, panel Minh bạch |
| `--blue` (cobalt) | `#037B96` | Hành động — CTA, link, tiêu đề tô màu |
| `--blue-l` | `#82E6FD` | Nền tint, trust strip, chip "đã kiểm chứng" |
| `--bg` (paper) | `#CDF5FE` | Nền section xen kẽ |
| `--coral` | `#C0392B` | **CHỈ** nguy cơ/khẩn cấp |
| `--amber` | `#995100` | Nhãn "demo", chú ý nhẹ |

- **Typography:** Roboto (hỗ trợ tiếng Việt), phân cấp H1–H4 rõ ràng, `line-height:1.6` cho vùng đọc dài.
- **Nguyên tắc:** navy = "nơi CCHC nói với tư cách cơ quan"; cobalt = "nơi người dùng hành động"; coral = "nơi cần dừng lại". Sự nhất quán này là một dạng *nhãn thị giác* củng cố IA.

---

## 9. NGUYÊN TẮC & CHỈ SỐ THÀNH CÔNG

### 9.1. Nguyên tắc thiết kế (rút từ khung O'Reilly)
1. **Thẩm quyền là bề mặt thường trực**, không phải một trang riêng.
2. **Mọi khẳng định đều truy nguyên được** về gốc thể chế trong ≤1 cú chạm.
3. **Quyền lực đi kèm giới hạn quyền lực** — luôn hiển thị Minh bạch cạnh Thẩm quyền.
4. **Từ vựng có kiểm soát** cho mọi tín hiệu niềm tin (M1–M4, trạng thái đính chính…).
5. **Thiết kế cho người hoài nghi và người cao tuổi** — cỡ chữ điều chỉnh, tương phản AA, ngôn ngữ dân hiểu.
6. **Phân cấp nông + siêu liên kết giàu** cho khả năng truy nguyên.

### 9.2. Chỉ số đo lường (KPIs)
- **Tỷ lệ truy nguyên thẩm quyền:** % phiên có xem tín hiệu bảo chứng (tên chuyên gia / hội / quy trình 8 bước).
- **Độ sâu tới bằng chứng:** số cú chạm trung bình từ nội dung → nguồn thẩm quyền (mục tiêu ≤1).
- **Tìm-thấy (findability):** tỷ lệ tìm kiếm dẫn tới nội dung có nhãn M1/M2.
- **Sử dụng Bản đồ nội dung** và tỷ lệ thoát ở empty state.
- **Tỷ lệ nhà báo tải thông cáo/media kit** không cần đăng nhập.

---

## 10. TÀI LIỆU HÓA & BƯỚC TIẾP THEO

- **Blueprint/Sitemap:** xem Mục 2.3.
- **Wireframe cần bổ sung:** (a) mẫu bài viết có thẩm quyền với đầy đủ metadata; (b) hồ sơ chuyên gia; (c) trang kết quả tìm kiếm gắn nhãn M1–M4; (d) overlay Bản đồ nội dung.
- **Content model:** chuẩn hóa "Đơn vị nội dung có thẩm quyền" (Mục 6) thành schema CMS.
- **Kiểm thử:** card sorting để xác nhận nhãn nhánh thẩm quyền; tree testing đo độ truy nguyên; test khả năng tiếp cận với nhóm người cao tuổi.
- **Quản trị (governance):** quy trình duy trì từ vựng có kiểm soát (M1–M4, danh mục chuyên khoa) và nhật ký đính chính 4 trạng thái.

---

*Tài liệu áp dụng khung Information Architecture (Rosenfeld, Morville & Arango). Nội dung minh hoạ trên bản demo định hướng giao diện — không phải thiết kế cuối cùng.*
