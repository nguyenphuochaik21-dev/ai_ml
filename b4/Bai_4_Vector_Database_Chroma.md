# Buổi 4 — Lưu và truy vấn embedding với Chroma

**Ngày:** Thứ Tư, 04/11/2026  
**Thời lượng gợi ý:** 2–3 giờ  
**Nối tiếp:** Buổi 3 — embedding và semantic search

## Mục tiêu

Sau buổi học, bạn có thể:

1. Phân biệt embedding model với vector database.
2. Tạo collection, lưu vector kèm nội dung và metadata.
3. Truy vấn top-k bằng vector câu hỏi, đọc khoảng cách và lọc metadata.
4. Lưu dữ liệu xuống đĩa và mở lại collection.

## Lịch học

| Thời gian | Nội dung |
|---|---|
| 0–20 phút | Ôn quy trình semantic search và vai trò embedding |
| 20–45 phút | Vector database: ID, vector, document, metadata, collection |
| 45–90 phút | Thực hành ghi dữ liệu và truy vấn Chroma |
| 90–120 phút | Persistence, lọc metadata và kiểm tra distance |
| 120–150 phút | Bài tập cập nhật dữ liệu và tổng kết |

## 1. Vector database làm gì?

Embedding model chuyển văn bản thành vector. Vector database lưu vector cùng ID, văn bản gốc và metadata; sau đó hỗ trợ tìm các vector gần truy vấn mà không phải tự quét toàn bộ ma trận mỗi lần. Với dữ liệu nhỏ, quét tuyến tính như buổi 3 vẫn dễ kiểm tra; database hữu ích khi cần lưu trữ, lọc và quản lý corpus.

Trong Chroma, một collection chứa các mục có ID duy nhất. Mỗi mục có thể kèm documents, embeddings và metadatas. Notebook tự tạo embedding bằng Sentence Transformers rồi gửi vector vào Chroma để tách rõ trách nhiệm của hai thành phần.

Luồng dữ liệu:

1. Chuẩn hóa/chia tài liệu thành đoạn.
2. Tạo embedding cho từng đoạn.
3. Ghi ID, đoạn văn, embedding và metadata vào collection.
4. Tạo embedding cho truy vấn rồi gọi query.
5. Đọc văn bản, metadata và khoảng cách của các kết quả.

## 2. Thực hành trong notebook

Mở file **Bai_4_Vector_Database_Chroma.ipynb**:

- Dùng lại mô hình đa ngôn ngữ của buổi 3.
- Tạo PersistentClient với thư mục dữ liệu cục bộ riêng trong b4.
- Tạo collection có metric cosine.
- Dùng upsert để chạy lại notebook mà không bị lỗi ID đã tồn tại.
- Tìm kiếm bằng query_embeddings, sau đó thử điều kiện where theo metadata.
- Khởi tạo client lần nữa và kiểm tra collection vẫn còn dữ liệu.

Chroma trả về khoảng cách. Với cosine distance, số thấp hơn nghĩa là gần hơn; không đọc distance như cosine similarity nếu chưa chuyển đổi. Collection này lưu embedding do bạn truyền vào, nên truy vấn cũng phải có vector cùng kích thước và cùng mô hình.

## 3. Những điều cần tránh

- Đổi mô hình embedding nhưng tiếp tục ghi vào collection cũ: kích thước hoặc hệ tọa độ có thể không tương thích.
- Bỏ metadata nguồn: khi truy xuất sẽ khó biết đoạn đến từ file/trang nào.
- Dùng add lặp lại cùng ID khi muốn cập nhật: dùng upsert cho ví dụ có thể chạy nhiều lần.
- Nghĩ rằng vector database tự làm sạch văn bản, chọn chunk tốt hoặc đánh giá câu trả lời: các bước đó vẫn thuộc pipeline của bạn.

## Bài tập cuối buổi

1. Thêm trường metadata source, topic và page cho mỗi đoạn.
2. Viết hai truy vấn giống nhau nhưng lọc theo hai topic khác nhau.
3. Cập nhật nội dung một ID bằng upsert, rồi kiểm tra nội dung mới trong kết quả.
4. Giải thích vì sao một truy vấn không có đáp án vẫn có thể trả về top-k kết quả.

## Tiêu chí hoàn thành

- Collection có ít nhất 6 bản ghi với ID duy nhất.
- Truy vấn trả về văn bản, metadata và distance.
- Notebook chạy lại được và mở lại dữ liệu sau khi tạo client mới.

## Tài liệu tham khảo

- [Chroma: Python client](https://docs.trychroma.com/reference/python)
- [Chroma: Usage guide](https://github.com/chroma-core/chroma/blob/main/docs/docs/usage-guide.md)
- [Sentence Transformers: Semantic Search](https://www.sbert.net/examples/sentence_transformer/applications/semantic-search/README.html)

## Tách rõ các thành phần trong collection

Một collection giống một bảng các bản ghi có cùng mục đích tìm kiếm. Mỗi bản ghi nên là một đơn vị đủ nhỏ để đưa vào ngữ cảnh nhưng đủ dài để không mất ý.

| Trường | Ví dụ | Câu hỏi cần tự trả lời |
|---|---|---|
| ID | handbook-p3-chunk02 | Nếu nạp lại file, làm sao biết đây vẫn là đoạn cũ? |
| Document | Nội dung đoạn văn | Người dùng sẽ đọc/trích dẫn gì khi truy xuất? |
| Embedding | Vector tạo từ document | Query có được mã hóa cùng model không? |
| Metadata | source, page, topic | Cần lọc hoặc lần về file gốc theo trường nào? |

Metadata nên là các giá trị có thể lọc và hiển thị được. Hãy giữ tối thiểu source, số trang/đoạn và topic. Tránh nhét toàn bộ metadata vào một trường text nếu sau này cần lọc theo nó.

## Walkthrough: từ nạp dữ liệu đến đọc kết quả

~~~python
client = chromadb.PersistentClient(path="./chroma_data")
collection = client.get_or_create_collection(
    name="course_notes",
    metadata={"hnsw:space": "cosine"}
)

collection.upsert(
    ids=["b2-p1-c1", "b2-p1-c2"],
    documents=["Đoạn thứ nhất...", "Đoạn thứ hai..."],
    embeddings=document_vectors.tolist(),
    metadatas=[
        {"source": "buoi_2.pdf", "page": 1, "topic": "tfidf"},
        {"source": "buoi_2.pdf", "page": 1, "topic": "retrieval"}
    ]
)

result = collection.query(
    query_embeddings=[query_vector.tolist()],
    n_results=3,
    where={"topic": "retrieval"},
    include=["documents", "metadatas", "distances"]
)
~~~

1. Client chỉ định nơi lưu/mở database.
2. Collection đặt tên không gian bản ghi và cấu hình metric.
3. Upsert đưa các trường vào cùng batch; thứ tự ID, documents, embeddings, metadatas phải tương ứng.
4. Query cần vector có cùng dimension với vector đã lưu.
5. Kết quả được nhóm theo từng query. Với một query, đọc danh sách ids, documents và các trường tương ứng ở vị trí đầu tiên.

## add, upsert, get và query

- **add** thêm bản ghi mới; ID đã có thường gây lỗi trùng.
- **upsert** thêm hoặc cập nhật theo ID, phù hợp notebook phải chạy lại.
- **get** lấy bản ghi theo ID/where, không xếp theo độ gần vector.
- **query** tìm các vector gần query; có thể kèm điều kiện where và trả khoảng cách.

Khi đưa tài liệu mới vào ứng dụng thật, hãy định nghĩa rõ chính sách cập nhật: xóa bản ghi cũ cùng source rồi nạp lại, hay dùng ID ổn định và upsert. Không sinh ID ngẫu nhiên mỗi lần nếu mục tiêu là cập nhật.

## Đọc distance đúng cách

Với cosine distance, vector càng gần thì distance càng nhỏ. Với metric khác, ý nghĩa và chiều xếp hạng cũng khác. Chọn metric trước khi so score; không so trực tiếp distance của collection khác metric hoặc embedding model.

Distance là tín hiệu xếp hạng, không phải xác suất câu trả lời đúng. Chẳng hạn 0.2 không có nghĩa “20% sai”. Để biết ngưỡng nào đủ tốt, cần tập query có nhãn và đọc các trường hợp sai.

## Lọc metadata có thể làm mất đáp án

Filter thường thu hẹp tập ứng viên trước khi ta đọc top-k. Nếu metadata bị ghi thiếu hoặc gán topic sai, đoạn đúng có thể bị loại. Khi kết quả rỗng:

1. Gọi count để chắc collection có dữ liệu.
2. Dùng get không filter để xem ID/document/metadata đang lưu.
3. Kiểm tra chính tả và kiểu dữ liệu metadata trong điều kiện where.
4. Bỏ filter thử lại; nếu kết quả xuất hiện thì lỗi ở điều kiện lọc.
5. Nếu có lỗi dimension, xác nhận model tạo query vector giống model lúc index.

## Thử nghiệm có kiểm soát

Thay đổi từng thứ một: đầu tiên query, sau đó filter, cuối cùng số kết quả. Ghi lại ID và distance. Nếu cùng lúc đổi chunk size, model và metric, bạn sẽ không biết thay đổi nào làm kết quả tốt/xấu.

### Câu hỏi ôn tập

1. Vì sao document cần lưu cùng embedding?
2. Vì sao upsert phù hợp hơn add trong notebook thường chạy lại?
3. Kết quả query khác get ở điểm nào?
4. Nếu đổi model tạo embedding thì cần cập nhật những gì?
5. Nếu query không có đáp án, Chroma có trả nearest-neighbor không? Hệ thống nên xử lý thế nào?
