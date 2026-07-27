CCHC — Bộ sơ đồ kiến trúc dạng cây dọc v0.5

Trạng thái: baseline kiến trúc dự thảo, dùng để đối soát registry và lập ma trận truy xuất.Chưa khóa: thẩm quyền M4, mô hình phê duyệt ngoài hệ thống, quyền quản lý COI, tích hợp AI, physical ERD và các quyết định DEC/GAP.

Quy ước

[ACTOR]: người, vai trò hoặc hệ thống bên ngoài có mục tiêu và tương tác trực tiếp với nền tảng CCHC.

[STAKEHOLDER]: bên có ảnh hưởng, lợi ích hoặc thẩm quyền nhưng chưa có luồng tương tác trực tiếp.

[COMPONENT]: thành phần nằm bên trong ranh giới nền tảng; không phải Actor.

[CONDITIONAL]: chỉ kích hoạt khi mô hình vận hành hoặc tích hợp được xác nhận.

[DEC]: quyết định cần người có thẩm quyền phê duyệt.

[GAP]: thông tin hoặc căn cứ còn thiếu.

Một Actor có thể đảm nhiệm nhiều vai trò; một người chỉ được thực hiện quyền đang có hiệu lực tại thời điểm thao tác.

00. Nguyên tắc nền của kiến trúc thông tin

Kiến trúc thông tin CCHC được dẫn xuất đồng thời từ nhu cầu và hành trình người dùng, mục tiêu và sứ mệnh của tổ chức, cùng các quan hệ thẩm quyền, chuyên môn, nguồn lực và khuếch đại.

Hai trục dẫn xuất IA
├── Trục hướng người dùng
│   ├── Nhu cầu thông tin
│   ├── Nhiệm vụ cần hoàn thành
│   ├── Hành trình và điểm vào
│   ├── Bước tiếp theo an toàn
│   └── Khả năng tiếp cận
│
└── Trục hướng tổ chức
    ├── Mục tiêu và sứ mệnh
    ├── Thẩm quyền và quản trị
    ├── Quan hệ chuyên môn / bảo chứng uy tín
    ├── Quan hệ tài trợ / dịch vụ / nguồn lực
    └── Quan hệ báo chí / khuếch đại ảnh hưởng

Hai trục cùng quyết định:

Quyết định kiến trúc thông tin
├── Vị trí trên sitemap
├── Mức độ nổi bật trên trang
├── Điều hướng và liên kết chéo
├── Hồ sơ chuyên gia, tổ chức và chương trình
├── Khu vực báo chí, hợp tác và tài trợ
├── Disclosure / minh bạch quan hệ
└── Quyền, workflow và dấu vết phê duyệt

Ràng buộc:

Chỉ phản ánh các quan hệ có ý nghĩa nghiệp vụ, có owner, phạm vi và căn cứ.

Không sao chép nguyên trạng sơ đồ tổ chức vào sitemap.

Không để quyền lực stakeholder làm suy giảm Search, Trust, Medical Safety, Accessibility hoặc bước tiếp theo an toàn của người dân.

Thứ tự ưu tiên hiển thị phải được truy xuất về requirement, bằng chứng người dùng hoặc quyết định có thẩm quyền; không mặc định suy ra từ vị thế tổ chức.

Đây là nguyên tắc tổng hợp từ các tài liệu chiến lược, đối tác, IA và RTM của CCHC; không phải căn cứ để tự tạo thêm quan hệ chưa được xác nhận.

1. Bản đồ kiến trúc tổng

Kiến trúc CCHC
├── 00. IA Design Principles
├── 01. Actor Directory
├── 02. Stakeholder / Authority Directory
├── 03. Authority / RBAC / RACI Matrix
├── 04. System Boundary & Component Registry
├── 05. Use Case Registry
│   ├── Public Use Case
│   ├── CMS Use Case
│   └── Actor–Use Case Map
├── 06. User Flow Registry
├── 07. Workflow Registry
├── 08. Content & Entity Model
├── 09. System Function & Integration Registry
├── 10. IA / Route / Navigation Registry
├── 11. Template / Screen / State Registry
├── 12. Cross-cutting Requirements
├── 13. Traceability / Test / Evidence / Gate
└── 14. Decision & Gap Register

Nguyên tắc: một nhánh chỉ được coi là “khóa” khi có ID chuẩn, owner, căn cứ, quan hệ truy xuất và acceptance evidence.

2. Actor Directory

Actor
├── Bên ngoài (External)
│   ├── Cá nhân
│   │   ├── Người dân / người chăm sóc
│   │   ├── Chuyên gia y tế — vai trò công khai
│   │   └── Nhà báo / phóng viên
│   │
│   └── Đại diện tổ chức
│       ├── Đại diện Hội nghề nghiệp
│       ├── Đại diện Viện / Trường
│       ├── Đại diện Cơ sở y tế
│       ├── Đại diện Doanh nghiệp / đối tác
│       └── Đại diện Nhà tài trợ
│
├── Nội bộ (Internal)
│   ├── Sản xuất nội dung
│   │   ├── Người viết
│   │   ├── Biên tập khoa học
│   │   └── Người kiểm tra nguồn / Medical Editor
│   │
│   ├── Kiểm duyệt
│   │   ├── Chuyên gia phản biện — vai trò CMS
│   │   └── Người kiểm duyệt pháp lý
│   │
│   ├── Phê duyệt và xuất bản
│   │   ├── Người phê duyệt được ủy quyền
│   │   ├── Người phê duyệt M4 [CONDITIONAL]
│   │   └── Publisher
│   │
│   └── Quản trị và vận hành
│       ├── CMS Administrator
│       ├── Người duyệt hồ sơ chuyên gia / hội
│       ├── Người theo dõi và đính chính / Correction Manager
│       ├── Content Architect / Taxonomy Admin
│       ├── Event / Form Owner
│       ├── Analytics / Risk Lead [CONDITIONAL]
│       └── AI Lead [CONDITIONAL]
│
└── Hệ thống bên ngoài (External System Actor) [CONDITIONAL]
    ├── Dịch vụ AI bên ngoài
    ├── Dịch vụ gửi email / thông báo
    ├── Nhà cung cấp xác thực
    └── Nền tảng sự kiện bên ngoài

Lưu ý:

Đại diện Hội nghề nghiệp là Actor nếu giữ ít nhất một use case như gửi đề xuất, đăng ký sự kiện hoặc cập nhật hồ sơ.

Hội nghề nghiệp với tư cách tổ chức là Entity; người đại diện mới là Actor thao tác.

Chuyên gia y tế công khai và chuyên gia phản biện CMS là hai vai trò khác nhau, dù có thể do cùng một người đảm nhiệm.

Người quản lý sổ COI chưa tách thành Actor độc lập cho tới khi có quyền và use case riêng; hiện là responsibility được phân công trong ma trận quyền.

3. Stakeholder và cơ quan thẩm quyền

Stakeholder / Authority
├── Cơ quan quản lý
│   ├── Nguồn ràng buộc pháp lý / chuyên ngành
│   └── Thành Actor nếu có cổng hoặc quy trình tương tác trực tiếp
│
├── Tổng hội Y học Việt Nam
│   ├── Quan hệ quản lý / bảo trợ theo căn cứ được duyệt
│   └── Thành Actor nếu trực tiếp gửi, nhận hoặc phê duyệt trên hệ thống
│
├── Ban Giám đốc
│   ├── Cơ quan có thẩm quyền
│   └── Cá nhân được ủy quyền trở thành Actor phê duyệt
│
├── Hội đồng Khoa học
│   ├── Cơ quan tư vấn / thẩm định [DEC]
│   └── Cá nhân tham gia workflow trở thành Actor tương ứng
│
├── Chủ thể dữ liệu
│   ├── Người đăng ký sự kiện
│   ├── Người gửi biểu mẫu
│   └── Chuyên gia có hồ sơ
│
└── Nhà đầu tư / Quỹ tài trợ dài hạn
    ├── Stakeholder về nguồn lực / tác động
    └── Thành Actor nếu có use case và quyền trực tiếp

Không dùng tiêu chí “có tài khoản hay không” để phân biệt Actor. Tiêu chí là có mục tiêu và tương tác trực tiếp với hệ thống hay không.

4. Authority / RBAC / RACI Matrix

Authority & Permission
├── Actor × Use Case
│   ├── Người khởi tạo
│   ├── Người thực hiện
│   ├── Người phản biện
│   ├── Người phê duyệt
│   └── Người chỉ được xem
│
├── RACI theo quy trình
│   ├── Responsible
│   ├── Accountable
│   ├── Consulted
│   └── Informed
│
├── Quyền theo Entity
│   ├── Create
│   ├── Read
│   ├── Update
│   ├── Approve
│   ├── Publish
│   ├── Suspend / Withdraw
│   └── Delete / Anonymize
│
├── Thẩm quyền theo Risk Tier
│   ├── Mức rủi ro
│   ├── Loại reviewer bắt buộc
│   ├── Legal review condition
│   ├── Approver bắt buộc
│   └── M4 authority [DEC]
│
├── Kiểm soát xung đột
│   ├── Separation of duties
│   ├── Không tự duyệt
│   ├── Khai báo COI trước nhiệm vụ
│   ├── Recusal / thay reviewer
│   └── Hard-lock khi sai thẩm quyền
│
└── Hiệu lực quyền
    ├── Delegation / ủy quyền
    ├── Effective from / to
    ├── Tạm khóa / thu hồi
    ├── Emergency authority
    └── Audit mọi thay đổi quyền

Mỗi quyền phải trả lời được: ai → được làm gì → trên entity nào → trong điều kiện nào → trong thời gian nào → ai chịu trách nhiệm.

5. Ranh giới hệ thống và thành phần nội bộ

Ranh giới nền tảng CCHC
├── Thành phần nghiệp vụ nội bộ [COMPONENT]
│   ├── CMS / Content Workflow
│   ├── Expert & Organization Directory
│   ├── Event & Form Management
│   ├── AI Copilot
│   ├── Dynamic Hub
│   └── Hard-lock / Policy Engine
│
├── Dịch vụ nền nội bộ [COMPONENT]
│   ├── Search Index
│   ├── Scheduler / Reminder
│   ├── Notification Orchestrator
│   ├── Analytics
│   ├── Syndication Tracker
│   └── Audit / Observability
│
├── Kiểm soát nền tảng [COMPONENT]
│   ├── Identity & Access Control
│   ├── Consent & Retention
│   ├── Versioning
│   ├── Safety Rules
│   └── Backup / Recovery
│
└── Ngoài ranh giới [ACTOR hệ thống nếu có tích hợp]
    ├── AI Provider
    ├── Email / Notification Provider
    ├── Identity Provider
    └── External Event Platform

Quy tắc: thành phần máy chỉ là Actor khi nằm ngoài ranh giới CCHC và giao tiếp qua API, webhook hoặc interface độc lập.

6. Use Case Registry

Mỗi use case chỉ tồn tại một lần. Registry không lặp use case theo Actor; quan hệ nhiều–nhiều nằm trong Actor–Use Case Map.

6.1. Public Use Case

Public Use Case
├── Khám phá và đọc nội dung
│   ├── Duyệt nội dung theo chủ đề / đối tượng
│   ├── Đọc bài viết
│   ├── Tìm nội dung phù hợp
│   ├── Xem hồ sơ chuyên gia
│   ├── Xem hồ sơ Hội chuyên khoa
│   └── Xem nguồn, tác giả, reviewer và ngày rà soát
│
├── An toàn, minh bạch và phản hồi
│   ├── Xem cảnh báo an toàn và bước tiếp theo
│   ├── Đọc chính sách minh bạch
│   ├── Xem công bố COI, tài trợ và đóng góp AI
│   ├── Xem lịch sử đính chính / phiên bản
│   └── Báo sai sót
│
├── Sự kiện
│   ├── Xem sự kiện
│   ├── Đăng ký sự kiện
│   ├── Tra cứu trạng thái đăng ký [nếu có cơ chế tra cứu]
│   └── Tải tài liệu sau sự kiện
│
├── Chuyên gia
│   ├── Đăng ký tham gia mạng lưới
│   ├── Cung cấp bằng chứng danh tính / chuyên môn
│   ├── Theo dõi kết quả đăng ký [nếu có cơ chế tra cứu]
│   ├── Cập nhật hồ sơ cá nhân
│   └── Yêu cầu xác minh lại
│
├── Báo chí và syndication
│   ├── Tìm chuyên gia
│   ├── Lấy media kit
│   ├── Tải thông cáo báo chí
│   ├── Liên hệ fact-check
│   ├── Xin phép / xác nhận điều kiện đăng lại bài
│   └── Cung cấp URL nơi bài đã đăng lại
│
└── Hợp tác tổ chức
    ├── Gửi đề xuất hợp tác
    ├── Tra cứu trạng thái đề xuất [nếu có cơ chế tra cứu]
    ├── Xem danh sách chuyên gia thuộc Hội
    ├── Đăng ký sự kiện — dùng participant_type
    └── Xem báo cáo tác động được phép công bố

6.2. CMS Use Case

CMS Use Case
├── Sản xuất
│   ├── Tạo / nhập bản nháp
│   ├── Soạn bài với AI có log
│   ├── Gắn metadata và taxonomy
│   ├── Gắn nguồn và mức độ bằng chứng
│   ├── Ghi disclosure / COI liên quan
│   └── Gửi bài vào quy trình duyệt
│
├── Kiểm tra nguồn và phản biện
│   ├── Kiểm tra nguồn / citation
│   ├── Nhận hoặc từ chối nhiệm vụ phản biện
│   ├── Khai báo có / không có COI trước khi duyệt
│   ├── Gửi phản biện có cấu trúc
│   ├── Đề xuất Risk Tier
│   ├── Kiểm tra rủi ro pháp lý
│   ├── Yêu cầu sửa
│   └── Từ chối bài
│
├── Phê duyệt
│   ├── Xác nhận Risk Tier
│   ├── Kiểm tra đúng thẩm quyền
│   ├── Phê duyệt
│   ├── Chuyển cấp M4 [CONDITIONAL]
│   └── Trả lại / từ chối có lý do
│
├── Xuất bản
│   ├── Xuất bản
│   ├── Lên lịch xuất bản
│   ├── Cập nhật nội dung đã xuất bản
│   ├── Xuất bản đính chính và gắn nhãn
│   ├── Tạm ngưng
│   ├── Hết hạn
│   └── Thu hồi
│
├── Hậu kiểm và vận hành
│   ├── Xử lý phản hồi sai sót
│   ├── Quản lý lịch rà soát
│   ├── Theo dõi hiệu quả nội dung
│   ├── Theo dõi rủi ro
│   ├── Theo dõi sự kiện
│   └── Xem lịch sử phê duyệt / audit
│
└── Quản trị
    ├── Quản lý tài khoản và phân quyền
    ├── Quản lý taxonomy / chủ đề
    ├── Quản lý hồ sơ chuyên gia và tổ chức
    ├── Quản lý relationship / disclosure
    ├── Quản lý sự kiện, form, submission và consent
    ├── Quản lý redirect / canonical URL
    └── Xử lý sự cố / nội dung khẩn cấp

Các hành vi tự động như tạo version, index, gửi email, nhắc lịch và đếm syndication thuộc System Function Registry, không phải use case độc lập.

6.3. Actor–Use Case Map dùng chung

Use case dùng chung
├── Xem hồ sơ chuyên gia
│   ├── Người dân / người chăm sóc
│   ├── Chuyên gia y tế
│   ├── Nhà báo / phóng viên
│   └── Đại diện Hội nghề nghiệp
│
├── Xem hồ sơ Hội chuyên khoa
│   ├── Chuyên gia y tế
│   ├── Nhà báo / phóng viên
│   └── Đại diện tổ chức
│
├── Đăng ký sự kiện
│   ├── Cá nhân
│   └── Đại diện tổ chức — phân biệt bằng participant_type
│
├── Xin phép / đăng lại bài
│   ├── Nhà báo / phóng viên
│   ├── Đại diện Viện / Trường
│   └── Đại diện Cơ sở y tế
│
├── Gửi đề xuất hợp tác
│   ├── Đại diện Hội nghề nghiệp
│   ├── Đại diện Viện / Trường
│   ├── Đại diện Cơ sở y tế
│   ├── Đại diện Doanh nghiệp / đối tác
│   └── Đại diện Nhà tài trợ
│
└── Trả bài / yêu cầu sửa
    ├── Biên tập / kiểm tra nguồn
    ├── Chuyên gia phản biện
    ├── Người kiểm duyệt pháp lý
    └── Người phê duyệt

Xuất bản đính chính và Xem lịch sử đính chính là hai use case khác nhau; người dùng công khai không phải Actor của use case nội bộ.

7. User Flow Registry

User Flow Registry
├── FLOW-01 · Tra cứu thông tin sức khỏe
│   └── Tìm / duyệt → chọn bài → đánh giá nguồn → đọc bước tiếp theo
│
├── FLOW-02 · Xem bước tiếp theo an toàn
│   └── Nhận diện cảnh báo → safety intercept → hành động phù hợp
│
├── FLOW-03 · Báo sai sót
│   └── Mở biểu mẫu → gửi bằng chứng → nhận xác nhận → theo dõi xử lý
│
├── FLOW-04 · Phóng viên tìm chuyên gia
│   └── Tìm / lọc → xem hồ sơ → fact-check / liên hệ
│
├── FLOW-05 · Chuyên gia đăng ký mạng lưới
│   └── Khai hồ sơ → cung cấp bằng chứng → consent → thẩm định → kết quả
│
├── FLOW-06 · Gửi đề xuất tài trợ / hợp tác
│   └── Chọn loại đề xuất → disclosure → gửi → routing → phản hồi
│
├── FLOW-07 · Soạn thảo đến công bố
│   └── Draft → review → approval → schedule / publish → monitor
│
├── FLOW-08 · Xử lý sai sót và đính chính
│   └── Tiếp nhận → triage → correction draft → duyệt → công bố → lan truyền
│
├── FLOW-09 · Thẩm định hồ sơ chuyên gia / hội
│   └── Submission → verify → request evidence / approve / reject → publish
│
├── FLOW-10 · Cấu hình và xử lý form
│   └── Define → consent → submit → route → resolve → retain / delete
│
├── FLOW-11 · Công bố nội dung khẩn cấp
│   └── Trigger → emergency authority → accelerated review → publish → hậu kiểm
│
└── FLOW-12 · Sử dụng AI có kiểm soát
    └── Prompt / input → guardrail → output → human review → log → approve use

Mỗi flow phải có: entry point, happy path, alternate path, error/recovery, quyền, dữ liệu, trạng thái cuối và analytics event.

8. Workflow Registry

Workflow Registry
├── WF-01 · Content production & publication
├── WF-02 · Correction & post-publication review
├── WF-03 · Expert / Society verification
├── WF-04 · Event lifecycle
├── WF-05 · Form submission & case handling
├── WF-06 · Partner / Relationship approval
├── WF-07 · Disclosure / COI approval
├── WF-08 · Syndication permission & tracking
├── WF-09 · Emergency publication
├── WF-10 · AI-controlled use
└── WF-11 · Access provisioning / modification / revocation

8.1. Quy trình nội dung

Quy trình nội dung
├── 01. Tạo / nhập bản nháp
├── 02. Hoàn thiện metadata, nguồn, evidence và disclosure
├── 03. Đề xuất Risk Tier
├── 04. Kiểm tra biên tập và nguồn
├── 05. Phản biện chuyên môn
├── 06. Kiểm tra pháp lý [theo điều kiện]
├── 07. Xác nhận Risk Tier và thẩm quyền
├── 08. Phê duyệt
│   └── Chuyển Approver M4 [nếu M4]
├── 09. Xuất bản hoặc lên lịch
└── 10. Theo dõi, rà soát và đính chính

Nhánh kiểm soát
├── Thiếu trường bắt buộc
│   └── Khóa cứng / fail-closed
├── Reviewer yêu cầu sửa
│   └── Quay lại bản nháp
├── Có COI không xử lý được
│   └── Recusal → gán reviewer khác
├── Approver sai thẩm quyền hoặc tự duyệt
│   └── Khóa cứng / fail-closed
├── Nội dung đã duyệt bị sửa
│   └── Tạo version mới → hủy hiệu lực phê duyệt cũ
└── Phát hiện rủi ro sau xuất bản
    └── Tạm ngưng → khắc phục → duyệt lại

9. Vòng đời nội dung và đính chính

Content Lifecycle
├── Draft
│   └── Review
│       ├── Draft — yêu cầu sửa
│       ├── Rejected — từ chối có lý do
│       └── Approved — đủ nguồn và thẩm quyền
│
├── Approved
│   ├── Scheduled
│   │   └── Published
│   └── Published
│
├── Published
│   ├── Revision Draft
│   │   └── Review / Approval
│   │       └── New Version Published
│   │
│   ├── Correction Draft
│   │   └── Review / Approval
│   │       └── Corrected Version Published
│   │           ├── Public correction notice
│   │           ├── Search propagation
│   │           ├── Dynamic Hub propagation
│   │           └── Syndication notification
│   │
│   ├── Suspended
│   │   └── Remediation → Review → Republish / Withdraw
│   ├── Expired
│   │   └── Revalidation → Review → Republish / Archive
│   └── Withdrawn
│
└── Nguyên tắc bất biến
    ├── Không ghi đè version đã duyệt
    ├── Mọi sửa đổi hậu phê duyệt tạo version mới
    ├── Phê duyệt cũ không áp dụng cho version mới
    ├── Không gắn trạng thái Corrected trước khi đính chính được duyệt
    └── Giữ audit trail và lịch sử công khai phù hợp

10. Content & Entity Model

10.1. Sáu aggregate nghiệp vụ chính

Aggregate là nhóm đối tượng nghiệp vụ có cùng ranh giới quản lý; không đồng nghĩa với một bảng dữ liệu hoặc một entity duy nhất.

Domain Model
├── 01. Content · Nội dung
│   ├── Content Item
│   ├── Content Version
│   ├── Topic / Taxonomy
│   ├── Media Asset
│   ├── Correction
│   └── Review Schedule
│
├── 02. Evidence · Bằng chứng
│   ├── Source / Citation
│   ├── Research Item
│   ├── Evidence Level
│   └── Content–Evidence Link
│
├── 03. Person / Expert · Con người / Chuyên gia
│   ├── Person
│   ├── Expert Profile
│   ├── Credential / Specialty
│   ├── Verification
│   └── Organization Affiliation
│
├── 04. Organization · Tổ chức
│   ├── Professional Society
│   ├── Institute / University
│   ├── Healthcare Provider
│   ├── Enterprise
│   ├── Sponsor / Funder
│   └── Organization Relationship
│
├── 05. Program · Chương trình
│   ├── Community Program
│   ├── Education Program
│   ├── Research Program
│   └── Partnership Program
│
└── 06. Event · Sự kiện
    ├── Conference / Seminar
    ├── Training
    ├── Community Event
    └── Event Registration

Đối tác không phải một entity độc lập. Một Organization trở thành đối tác trong một phạm vi và thời hạn cụ thể thông qua Organization Relationship.

Organization Relationship
├── Professional cooperation
├── Sponsorship
├── Service
├── Advisory
├── Amplification / Media
└── Governance

Mỗi relationship tối thiểu có: source organization → target organization → relationship type → scope → effective period → status → approval → disclosure.

10.2. Entity vận hành và quản trị

Operational & Governance Entity
├── Submission / Case
│   ├── Form Definition
│   ├── Consent Record
│   ├── Attachment
│   ├── Routing Owner
│   └── Case Status
├── Review Assignment / Task
├── Review / Approval Decision
├── Disclosure
│   ├── COI
│   ├── Sponsorship
│   ├── Service
│   └── AI contribution
├── Decision / Delegation / Recusal Record
├── Correction / Version
├── Reuse Permission
├── Syndication / Reuse Record
├── Account / Role / Permission
├── Notification
└── Audit Event

Submission / Case là entity nghiệp vụ có vòng đời, owner, SLA, trạng thái và retention; không chỉ là một chức năng phụ trợ.

10.3. Bảy loại Submission / Case

Submission / Case
├── EXPERT_APPLICATION
│   └── Chuyên gia muốn cộng tác
├── RESEARCH_PROPOSAL
│   └── Đề xuất nghiên cứu
├── PARTNERSHIP_PROPOSAL
│   └── Đề xuất hợp tác chung
├── MEDIA_CONTACT
│   └── Liên hệ báo chí / fact-check
├── SPONSORSHIP_PROPOSAL
│   └── Đề xuất tài trợ
├── COMMUNITY_APPLICATION
│   └── Tham gia chương trình cộng đồng
└── CONTENT_ERROR_REPORT
    └── Phản ánh nội dung sai

PARTNERSHIP_PROPOSAL tách khỏi SPONSORSHIP_PROPOSAL vì hợp tác chuyên môn, đào tạo hoặc truyền thông không đồng nghĩa với tài trợ.

Quảng bá liên kết Đào tạo không thuộc Submission nếu chỉ dẫn đến website bên ngoài. Nó thuộc External Link / Navigation và tối thiểu có: provider → destination URL → relationship/disclosure → tracking → review/expiry.

10.4. Logical ERD — Core Domain

erDiagram
    CONTENT_ITEM ||--|{ CONTENT_VERSION : "có phiên bản"
    CONTENT_VERSION ||--o{ CONTENT_EVIDENCE : "dùng bằng chứng"
    SOURCE ||--o{ CONTENT_EVIDENCE : "được trích dẫn"
    RESEARCH_ITEM o|--o{ CONTENT_EVIDENCE : "cung cấp nghiên cứu"

    PERSON ||--o| EXPERT_PROFILE : "có hồ sơ"
    EXPERT_PROFILE ||--o{ AFFILIATION : "có liên kết"
    ORGANIZATION ||--o{ AFFILIATION : "có thành viên"

    ORGANIZATION ||--o{ ORGANIZATION_RELATIONSHIP : "bên nguồn"
    ORGANIZATION ||--o{ ORGANIZATION_RELATIONSHIP : "bên đích"
    PROGRAM o|--o{ ORGANIZATION_RELATIONSHIP : "phạm vi chương trình"

    ORGANIZATION ||--o{ PROGRAM : "chủ trì hoặc tham gia"
    PROGRAM o|--o{ EVENT : "gồm sự kiện"
    EVENT ||--o{ EVENT_REGISTRATION : "nhận đăng ký"

    CONTENT_ITEM {
        string content_id
        string content_type
        string status
    }
    CONTENT_VERSION {
        string version_id
        datetime effective_at
        string review_status
    }
    CONTENT_EVIDENCE {
        string link_id
        string claim_scope
        string evidence_level
    }
    SOURCE {
        string source_id
        string source_type
        string citation
    }
    RESEARCH_ITEM {
        string research_id
        string research_type
        string status
    }
    PERSON {
        string person_id
        string display_name
    }
    EXPERT_PROFILE {
        string expert_id
        string verification_status
    }
    AFFILIATION {
        string affiliation_id
        string role
        date effective_from
        date effective_to
    }
    ORGANIZATION {
        string organization_id
        string organization_type
        string verification_status
    }
    ORGANIZATION_RELATIONSHIP {
        string relationship_id
        string relationship_type
        string scope
        date effective_from
        date effective_to
        string approval_status
    }
    PROGRAM {
        string program_id
        string program_type
        string status
    }
    EVENT {
        string event_id
        string event_type
        string status
    }
    EVENT_REGISTRATION {
        string registration_id
        string participant_type
        string status
    }

10.5. Logical ERD — Operational & Governance

erDiagram
    PERSON o|--o{ SUBMISSION_CASE : "gửi với tư cách cá nhân"
    ORGANIZATION o|--o{ SUBMISSION_CASE : "gửi với tư cách tổ chức"
    FORM_DEFINITION ||--o{ SUBMISSION_CASE : "thu thập"
    SUBMISSION_CASE ||--o{ CONSENT_RECORD : "ghi nhận đồng ý"
    SUBMISSION_CASE ||--o{ REVIEW_ASSIGNMENT : "được phân công"
    ACCOUNT ||--o{ REVIEW_ASSIGNMENT : "nhận nhiệm vụ"
    REVIEW_ASSIGNMENT ||--o{ DECISION : "tạo quyết định"
    SUBMISSION_CASE ||--o{ DECISION : "được xử lý"
    DISCLOSURE o{--o{ SUBMISSION_CASE : "công bố liên quan"

    ACCOUNT }o--o{ ROLE : "được gán"
    ROLE }o--o{ PERMISSION : "gồm quyền"
    DECISION o|--o{ DELEGATION_RECUSAL : "chịu kiểm soát"

    CONTENT_ITEM ||--o{ CORRECTION : "có đính chính"
    CORRECTION ||--|{ CONTENT_VERSION : "tạo phiên bản"
    CONTENT_ITEM ||--o{ REUSE_RECORD : "được sử dụng lại"
    REUSE_PERMISSION ||--o{ REUSE_RECORD : "cho phép"

    SUBMISSION_CASE {
        string submission_id
        string submission_type
        string case_status
        string routing_owner
        datetime submitted_at
    }
    FORM_DEFINITION {
        string form_id
        string form_type
        string version
    }
    CONSENT_RECORD {
        string consent_id
        string consent_type
        datetime granted_at
    }
    REVIEW_ASSIGNMENT {
        string assignment_id
        string review_type
        string status
        datetime due_at
    }
    DECISION {
        string decision_id
        string decision_type
        string outcome
        datetime decided_at
    }
    DISCLOSURE {
        string disclosure_id
        string disclosure_type
        string status
    }
    ACCOUNT {
        string account_id
        string status
    }
    ROLE {
        string role_id
        string role_name
    }
    PERMISSION {
        string permission_id
        string action
        string resource
    }
    DELEGATION_RECUSAL {
        string record_id
        string record_type
        datetime effective_from
        datetime effective_to
    }
    CORRECTION {
        string correction_id
        string status
        string public_notice
    }
    REUSE_PERMISSION {
        string permission_id
        string scope
        string status
    }
    REUSE_RECORD {
        string reuse_id
        string destination_url
        string status
    }

Hai ERD trên là logical ERD: mô tả entity và cardinality nghiệp vụ. Chưa dùng chúng như physical schema cho đến khi use case, workflow, ownership, retention và quy tắc polymorphic reference được đối soát.

11. System Function & Integration Registry

System Function & Integration
├── Search
│   ├── Index / re-index
│   ├── Eligibility check
│   ├── Safety-aware ranking
│   └── Remove / update stale result
│
├── Notification
│   ├── Email / message dispatch
│   ├── Template selection
│   ├── Retry / bounce handling
│   └── Delivery audit
│
├── Scheduling
│   ├── Scheduled publication
│   ├── Review reminder
│   ├── Expiry check
│   └── Escalation
│
├── AI control
│   ├── Input / output logging
│   ├── Data handling guardrail
│   ├── Human review requirement
│   └── AI contribution disclosure
│
├── Policy enforcement
│   ├── Required-field validation
│   ├── Authority / COI hard-lock
│   ├── Version invalidation
│   └── Fail-closed behavior
│
├── Propagation
│   ├── Correction propagation
│   ├── Dynamic Hub refresh
│   ├── Syndication notification
│   └── Cache invalidation
│
├── Measurement
│   ├── Analytics event
│   ├── Syndication tracking
│   ├── Metric calculation
│   └── Data-quality alert
│
└── External integration [CONDITIONAL]
    ├── Authentication
    ├── Email / notification provider
    ├── AI provider
    └── Event platform

Mỗi system function phải có: trigger → input → rule → output → failure/retry → audit → owner.

12. IA / Route / Navigation Registry

IA / Route / Navigation
├── Canonical Sitemap
│   ├── Public routes
│   ├── Authenticated public routes [nếu có]
│   ├── CMS routes
│   └── Utility / policy routes
│
├── Route Registry
│   ├── Route ID
│   ├── Path / pattern
│   ├── Route owner
│   ├── Access condition
│   ├── Canonical status
│   └── Index eligibility
│
├── Navigation
│   ├── Global navigation
│   ├── Utility navigation
│   ├── Local navigation
│   ├── Contextual link
│   ├── External link
│   ├── Breadcrumb
│   └── Footer / policy navigation
│
├── Discovery
│   ├── Search structure
│   ├── Facet / filter
│   ├── Topic / audience landing
│   └── Dynamic Hub composition
│
└── URL governance
    ├── Canonical URL
    ├── Redirect
    ├── Migration mapping
    ├── External destination / disclosure / tracking
    ├── Query-state rule
    ├── Deep-link behavior
    └── Archive / withdrawal behavior

13. Template / Screen / State Registry

UI Registry
├── Template Registry
│   ├── 7 template [cần đối soát baseline]
│   ├── Template anatomy
│   ├── Required trust blocks
│   └── Allowed component set
│
├── Screen Family Registry
│   ├── 25 screen family [cần đối soát baseline]
│   ├── Public screen
│   ├── Form / transaction screen
│   ├── Profile / directory screen
│   ├── CMS task screen
│   └── Admin / dashboard screen
│
├── Mapping
│   ├── Route → Template
│   ├── Screen → Use Case
│   ├── Screen → Actor / Permission
│   ├── Screen → Entity / Field
│   └── Screen → Analytics Event
│
└── State Registry
    ├── Default / Ready
    ├── Loading
    ├── Empty / Zero result
    ├── Validation error
    ├── System error
    ├── Offline / Retry
    ├── Unauthorized / Forbidden
    ├── Blocked by policy
    ├── Scheduled
    ├── Expired
    ├── Corrected
    ├── Suspended
    └── Withdrawn

Mỗi screen phải có cả trạng thái thành công, trạng thái không có dữ liệu, lỗi, mất quyền và đường phục hồi.

14. Cross-cutting Requirements

Cross-cutting Requirements
├── Trust / Medical Safety
│   ├── Nguồn / evidence / reviewer
│   ├── Risk Tier
│   ├── Safety intercept
│   └── Khi nào cần đi khám
│
├── Transparency
│   ├── COI
│   ├── Sponsorship / relationship
│   ├── AI contribution
│   └── Correction / version history
│
├── Accessibility / Responsive
│   ├── Keyboard / focus
│   ├── Screen reader
│   ├── Contrast / zoom
│   └── Mobile / reduced motion
│
├── Privacy / Data Governance
│   ├── Consent
│   ├── Data minimization
│   ├── Retention / deletion
│   └── Data-subject request
│
├── Security
│   ├── Least privilege
│   ├── MFA / session
│   ├── Audit
│   └── Incident handling
│
├── SEO / Discovery
│   ├── Canonical / redirect
│   ├── Structured data
│   ├── Index eligibility
│   └── Search safety
│
├── Analytics / Operations
│   ├── Metric catalog
│   ├── Analytics governance
│   ├── Monitoring / SLA
│   └── Crisis workflow
│
├── Performance / Reliability
│   ├── Performance budget
│   ├── Availability
│   ├── Retry / graceful degradation
│   └── Backup / disaster recovery
│
└── Migration / Data Quality
    ├── Content inventory
    ├── URL mapping
    ├── Data validation
    └── Reconciliation / rollback

Các yêu cầu xuyên suốt áp dụng cho mọi route, feature, screen và workflow; không để thành một checklist tách rời ở cuối dự án.

15. Traceability / Test / Evidence / Gate

Traceability Chain
├── Requirement / căn cứ / decision
│   └── Actor / Stakeholder / Authority
│       └── Use Case
│           └── User Flow
│               └── Workflow
│                   └── Entity / Data Rule
│                       └── Capability / System Function
│                           └── Route / Navigation
│                               └── Template / Screen / State
│                                   └── Acceptance Test
│                                       └── Evidence
│                                           └── Build / Launch Gate
│
└── Vòng phản hồi
    ├── Thiếu căn cứ → Requirement / Decision
    ├── Sai Actor hoặc quyền → Authority Matrix
    ├── Sai hành trình → User Flow
    ├── Thiếu dữ liệu → Entity Model
    ├── Sai cấu trúc → IA / Route
    ├── Thiếu trạng thái → UI Registry
    └── Thiếu evidence → không qua Gate

Gate tối thiểu

Gate
├── Definition Gate
│   ├── Có ID / owner / scope
│   └── Không trùng hoặc sai cấp registry
├── Design Gate
│   ├── Có flow, screen, state và data mapping
│   └── Có accessibility / safety behavior
├── Build Gate
│   ├── Acceptance test pass
│   ├── Permission / hard-lock pass
│   └── Audit / analytics event pass
└── Launch Gate
    ├── Nội dung và căn cứ được duyệt
    ├── Migration / redirect pass
    ├── Monitoring / incident owner sẵn sàng
    └── Không còn blocking DEC / GAP

16. Decision & Gap Register

DEC / GAP cần xác nhận
├── DEC-01 · Đại diện Hội nghề nghiệp có những use case nào?
├── DEC-02 · Ai là Approver M4 và bảng thẩm quyền cụ thể?
├── DEC-03 · Ban Giám đốc / HĐKH thao tác trong CMS hay phê duyệt ngoài hệ thống?
├── DEC-04 · Ai sở hữu sổ COI và quyền recusal / override?
├── DEC-05 · Dịch vụ AI, email, xác thực và sự kiện nằm trong hay ngoài boundary?
├── DEC-06 · Cơ quan quản lý có luồng tương tác riêng hay chỉ là Stakeholder?
├── DEC-07 · Có cơ chế tra cứu trạng thái cho đăng ký / đề xuất hay chỉ gửi email?
├── DEC-08 · Xác nhận bảy loại Submission và việc tách hợp tác khỏi tài trợ
├── GAP-01 · Đối soát 25 Public Use Case với inventory hiện tại
├── GAP-02 · Đối soát 36 CMS Use Case với inventory hiện tại
├── GAP-03 · Đối soát 7 template và 25 screen family
├── GAP-04 · Đánh ID và owner cho entity, route, function, test và evidence
└── GAP-05 · Chốt physical ERD, khóa ngoại và kiểu dữ liệu sau reconciliation

17. Kiểm tra nhất quán trước khi khóa baseline

Baseline Reconciliation
├── Actor
│   ├── Không lẫn Entity / Stakeholder / Component
│   └── Mỗi Actor có mục tiêu và ít nhất một Use Case
├── Use Case
│   ├── Không lẫn bước quy trình / system behavior
│   └── Mỗi Use Case có Actor, trigger và outcome
├── Flow / Workflow
│   ├── Có nhánh lỗi, từ chối, khôi phục
│   └── Có quyền, dữ liệu và trạng thái cuối
├── Entity
│   ├── Có owner, lifecycle, retention
│   └── Có relationship và disclosure phù hợp
├── IA / UI
│   ├── Mọi route có template / screen / state
│   └── Mọi screen nối lại Use Case và Actor
└── Gate
    ├── Mọi requirement có acceptance test
    └── Mọi gate có evidence và người ký