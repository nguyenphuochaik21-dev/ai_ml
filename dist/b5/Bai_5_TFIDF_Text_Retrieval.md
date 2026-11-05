# Buổi 5 — Tự viết notebook TF-IDF Text Retrieval

**Ngày học:** 05/11/2026 · **Thời lượng:** khoảng 2–3 giờ  
**Mục tiêu:** tạo vector tài liệu, biến câu hỏi vào cùng hệ cột, tính cosine và trả về top-k đoạn phù hợp.

Mở **Bai_5_TFIDF_Text_Retrieval.ipynb** bằng Colab hoặc Jupyter. CSV vi_text_retrieval.csv chưa có trong thư mục b2, nên notebook bắt đầu bằng bảng mẫu tự chứa. Thuật toán không cần internet hay file dữ liệu ngoài.

## 1. DataFrame giống bảng tính

Mỗi hàng là một bản ghi; mỗi cột là một trường. Cột text chứa tài liệu, question là câu hỏi.

~~~python
import pandas as pd

vi_data_df = pd.DataFrame({
    "text": [
        "TF-IDF giảm trọng số của từ phổ biến.",
        "Cosine so sánh hướng của hai vector.",
        "Vocabulary quyết định các cột trong vector."
    ],
    "question": [
        "Từ phổ biến bị xử lý thế nào?",
        "Đo hai vector gần nhau ra sao?",
        "Mỗi vị trí số biểu diễn điều gì?"
    ]
})
context = vi_data_df["text"].tolist()
context = [doc.lower() for doc in context]
~~~

- DataFrame tạo bảng từ các list có cùng số phần tử.
- Chọn cột text rồi tolist đổi sang list Python.
- Chuẩn hóa context bằng chữ thường; câu hỏi cũng phải chuẩn hóa giống vậy.
- Khi có CSV thật, dùng **pd.read_csv("vi_text_retrieval.csv")** rồi xem **vi_data_df.columns** và **vi_data_df.head()** để biết tên cột.

## 2. Fit tài liệu một lần

~~~python
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np

vectorizer = TfidfVectorizer()
doc_matrix = vectorizer.fit_transform(context)
~~~

fit_transform gồm hai việc: fit học vocabulary/IDF từ tập tài liệu; transform đổi từng câu thành hàng số. Nếu có N tài liệu và V từ, shape là (N, V). Ma trận sparse chỉ lưu phần tử khác 0 để tiết kiệm bộ nhớ.

## 3. Query phải dùng cùng vectorizer

~~~python
question = vi_data_df.iloc[0]["question"].lower()
query_vector = vectorizer.transform([question])
scores = cosine_similarity(query_vector, doc_matrix).ravel()
~~~

- iloc[0] lấy hàng đầu; ["question"] lấy câu hỏi.
- Bọc câu hỏi trong list vì vectorizer nhận một danh sách văn bản.
- transform dùng vocabulary/IDF đã học từ tài liệu. **Không fit lại query**, vì các cột phải cùng ý nghĩa.
- cosine_similarity trả điểm giữa câu hỏi và từng tài liệu. ravel đổi shape (1, N) thành (N,).

Nếu mọi điểm bằng 0, query có thể chỉ gồm từ ngoài vocabulary. Chương trình vẫn xếp hạng được nhưng chưa tìm thấy từ chung.

## 4. Xếp top-k và giữ đúng văn bản

~~~python
def tfidf_search(question, context, vectorizer, doc_matrix, top_k=5):
    query_vector = vectorizer.transform([question.lower()])
    scores = cosine_similarity(query_vector, doc_matrix).ravel()
    top_ids = np.argsort(scores)[::-1][:top_k]
    results = []
    for idx in top_ids:
        results.append({
            "id": int(idx),
            "cosine_score": float(scores[idx]),
            "text": context[idx]
        })
    return results
~~~

argsort đưa chỉ số theo điểm tăng dần; [::-1] đảo thành giảm dần; [:top_k] giữ k kết quả đầu. Trong vòng lặp, cùng idx được dùng lấy ID, điểm và văn bản nên chúng không bị ghép nhầm. Chuyển NumPy số thành int/float Python để dễ in hoặc lưu.

Notebook gốc đặt tên hàm corr_search nhưng bên trong dùng cosine_similarity. Đó là cosine, không phải tương quan Pearson. Bài thực hành sẽ hoàn thiện corr_search nhưng ghi rõ ý nghĩa thật của điểm.

## 5. Khi có CSV thật

~~~python
vi_data_df = pd.read_csv("vi_text_retrieval.csv")
print(vi_data_df.columns)
print(vi_data_df.head())
~~~

Kiểm tra cột text/question có tồn tại. Nếu file không nằm cạnh notebook, cần đường dẫn đúng. Hiện file chưa có trong b2; tiếp tục học với bảng mẫu là đủ.

Nếu thiếu thư viện, chạy **%pip install pandas scikit-learn**.

## 6. Bài cuối: notebook trắng

Đóng lời giải rồi tự viết theo đúng thứ tự:

1. Tạo hoặc đọc DataFrame; lấy context từ cột text.
2. Đổi context sang chữ thường.
3. Khởi tạo TfidfVectorizer và fit_transform(context).
4. Lấy query; transform bằng chính vectorizer đó.
5. Tính cosine với mọi tài liệu.
6. argsort, đảo chiều và lấy top-k.
7. In ID, điểm và văn bản.

Bạn đạt buổi 5 khi tự viết pipeline với dữ liệu khác ví dụ, hoàn thiện corr_search, giải thích vì sao query dùng transform và đọc được ID/score/text.

## Bài xác nhận cả ba ngày

- Notebook đạo văn: viết lại từ preprocess đến heatmap với ba tài liệu mới.
- Notebook retrieval: viết lại từ bảng dữ liệu đến corr_search với hai câu hỏi mới.
- Với mỗi hàm, nói được input, output và ý nghĩa một con số/shape.
- Viết khi đã che lời giải; sau đó mới mở để đối chiếu.

Ba ngày cung cấp lộ trình từ mức mới bắt đầu, nhưng chỉ đọc thì chưa thể bảo đảm viết độc lập. Hãy coi mình đạt khi hoàn thành hai bài notebook trắng trang. Nếu vướng, lặp lại đúng phần đó bằng một ví dụ mới.

**Notebook thực hành:** [Bai_5_TFIDF_Text_Retrieval.ipynb](Bai_5_TFIDF_Text_Retrieval.ipynb)

