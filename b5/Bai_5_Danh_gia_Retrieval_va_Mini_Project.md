# Buổi 5 — Đánh giá retrieval và mini project

**Ngày:** Thứ Năm, 05/11/2026  
**Thời lượng gợi ý:** 2–3 giờ  
**Nối tiếp:** Buổi 4 — lưu và truy vấn embedding với Chroma

## Mục tiêu

Sau buổi học, bạn có thể:

1. Tạo tập truy vấn nhỏ có nhãn tài liệu liên quan.
2. Tính Precision@k, Recall@k và MRR cho một hệ thống retrieval.
3. So sánh TF-IDF với dense retrieval trên cùng tập đánh giá.
4. Ghép hai bảng xếp hạng bằng Reciprocal Rank Fusion (RRF).
5. Trình bày một pipeline truy xuất nhỏ, kèm giới hạn đã quan sát.

## Lịch học

| Thời gian | Nội dung |
|---|---|
| 0–20 phút | Ôn truy xuất top-k và phân biệt ranking với đáp án |
| 20–50 phút | Tạo bộ query–relevant IDs và chia chunk |
| 50–90 phút | Cài đặt Precision@k, Recall@k, MRR |
| 90–120 phút | Đo TF-IDF, embedding và RRF |
| 120–160 phút | Mini project, phân tích lỗi và trình bày |

## 1. Vì sao cần đánh giá?

Một kết quả nhìn có vẻ hợp lý trên một truy vấn chưa nói lên chất lượng chung. Hãy chuẩn bị nhiều câu hỏi và đánh dấu các ID liên quan trước khi thử hệ thống. Dùng cùng tập truy vấn cho tất cả phương pháp để so sánh công bằng.

- **Precision@k:** trong k kết quả đầu, tỷ lệ kết quả có liên quan.
- **Recall@k:** trong tất cả tài liệu liên quan đã gán nhãn, hệ thống tìm được tỷ lệ bao nhiêu trong k kết quả đầu.
- **MRR:** lấy nghịch đảo thứ hạng của kết quả liên quan đầu tiên, rồi trung bình trên các truy vấn. Kết quả đúng xuất hiện càng sớm thì MRR càng cao.

Chỉ số không thay thế việc đọc lỗi. Hãy kiểm tra query nào bị trượt và xem lỗi đến từ dữ liệu, chunking, mô hình, metadata hay nhãn đánh giá.

## 2. Thực hành trong notebook

Mở file **Bai_5_Danh_gia_Retrieval_va_Mini_Project.ipynb**:

1. Chia các đoạn văn dài thành chunk có overlap nhỏ; giữ source và chỉ số chunk.
2. Tạo tập truy vấn có relevant IDs.
3. Tạo xếp hạng TF-IDF và embedding cho từng truy vấn.
4. Tính các metric ở k=3.
5. Thử RRF để trộn hai bảng xếp hạng.
6. In query khó nhất và giải thích nguyên nhân.

RRF cộng điểm 1/(c + rank) từ mỗi danh sách; trong công thức này rank bắt đầu từ 1 và c là hằng số làm giảm ảnh hưởng của vị trí tuyệt đối. RRF dùng thứ hạng thay vì yêu cầu các hệ thống có cùng thang điểm.

## 3. Mini project

Chọn một chủ đề nhỏ, chẳng hạn tài liệu khóa học, ghi chú cá nhân hoặc FAQ. Dùng tối thiểu 10 đoạn và 5 truy vấn. Pipeline cần:

- gắn ID và metadata nguồn cho mọi đoạn;
- tạo TF-IDF và embedding;
- trả top-3 cho mỗi truy vấn;
- đo Precision@3, Recall@3 và MRR;
- ghi ít nhất 2 lỗi và một thay đổi có thể cải thiện chúng.

Không cần dùng LLM để sinh câu trả lời. Trọng tâm là chất lượng truy xuất và khả năng giải thích kết quả. Nếu tiếp tục sang RAG, các đoạn được truy xuất sẽ làm ngữ cảnh đầu vào cho bước sinh.

## Tiêu chí hoàn thành

- Tập đánh giá có ít nhất 5 truy vấn và nhãn liên quan rõ ràng.
- Có bảng metric cho TF-IDF, embedding và/hoặc RRF.
- Có nhận xét về ít nhất 2 lỗi retrieval cụ thể.
- Có thể giải thích pipeline từ văn bản đầu vào đến top-k kết quả.

## Tài liệu tham khảo

- [scikit-learn: TfidfVectorizer](https://scikit-learn.org/stable/modules/generated/sklearn.feature_extraction.text.TfidfVectorizer.html)
- [Sentence Transformers: Semantic Search](https://www.sbert.net/examples/sentence_transformer/applications/semantic-search/README.html)
- [Chroma: Usage guide](https://github.com/chroma-core/chroma/blob/main/docs/docs/usage-guide.md)

## Gán nhãn truy vấn trước khi đo

Tập đánh giá nhỏ nhất gồm tập query và ID liên quan cho từng query. Hãy lập bảng này trước khi xem kết quả của retriever để tránh gán nhãn theo những gì model vừa trả.

| Query | Relevant IDs |
|---|---|
| Từ nào có ích để phân biệt tài liệu? | d01, d02 |
| Mô hình nào phát hiện email rác? | d03 |

Một query có thể có nhiều câu trả lời liên quan. Nêu rõ tiêu chí relevance: cùng chủ đề chưa chắc đã trả lời câu hỏi; ghi chú ngắn vì sao mỗi ID liên quan sẽ giúp người khác kiểm tra nhãn.

## Tính metric bằng tay

Ranking [d3, d1, d2, d4], relevant {d1, d4}, k=3:

- Top-3 là [d3, d1, d2].
- Có 1 hit trong 3 vị trí nên Precision@3 = 1/3.
- Có 1 trong 2 relevant IDs nên Recall@3 = 1/2.
- Relevant đầu tiên ở hạng 2 nên reciprocal rank = 1/2.

Nếu đổi thứ tự thành [d3, d2, d4, d1], số hit trong top-3 vẫn là 1 nên Precision@3 = 1/3 và Recall@3 = 1/2, nhưng reciprocal rank giảm xuống 1/3. Điều này minh họa vì sao MRR đo độ sớm của kết quả đúng đầu tiên.

## Macro average và trường hợp không có đáp án

Tính metric riêng cho từng query rồi lấy trung bình là macro average. Query dễ và query khó đều có trọng số như nhau. Đây phù hợp khi mỗi query phản ánh một nhu cầu người dùng riêng.

Query không có relevant ID thì Recall không xác định vì mẫu số bằng 0. Đừng tự gán Recall=1. Hãy đánh dấu loại query này riêng và đánh giá thêm hành vi no-answer: hệ thống có biết từ chối kết quả yếu hay không?

## RRF làm việc bằng rank

Với lexical ranking [d1,d2,d3] và dense ranking [d3,d1,d4], lấy c=60:

| ID | Điểm RRF |
|---|---|
| d1 | 1/61 + 1/62 ≈ 0.03252 |
| d3 | 1/63 + 1/61 ≈ 0.03227 |
| d2 | 1/62 ≈ 0.01613 |
| d4 | 1/63 ≈ 0.01587 |

d1 nhỉnh hơn d3 vì có vị trí cao ở cả hai danh sách. RRF hữu ích khi lexical và dense search bổ sung cho nhau. Nó không thể tự sửa một ranking sai; hãy đo RRF trên đúng tập query như các baseline.

## Kế hoạch mini project

1. Chọn một chủ đề và thu thập ít nhất 10 đoạn ngắn có nguồn.
2. Gán ID ổn định, topic/source và chunk index.
3. Viết 5–10 query đa dạng: câu hỏi diễn đạt khác, cụm từ chính xác, tên riêng, query khó và query không có đáp án.
4. Gán relevant IDs trước khi chạy hệ thống.
5. Chạy TF-IDF, dense retrieval và RRF với cùng corpus, cùng query, cùng k.
6. Ghi P@3, Recall@3, MRR theo query và macro average.
7. Chọn hai lỗi, mở đoạn nguồn, xác định nguyên nhân có bằng chứng.
8. Đổi một yếu tố duy nhất rồi chạy lại.

## Báo cáo kết quả tối thiểu

| Phương pháp | P@3 | Recall@3 | MRR |
|---|---:|---:|---:|
| TF-IDF | ... | ... | ... |
| Dense | ... | ... | ... |
| RRF | ... | ... | ... |

Sau bảng, trả lời: hệ thống nào tốt hơn cho loại query nào; trường hợp nào cả ba cùng thất bại; một cải tiến có thể kiểm chứng; và giới hạn của tập nhãn hiện tại. Metric cao trên năm query chỉ là tín hiệu ban đầu, không chứng minh tổng quát hóa tốt.
