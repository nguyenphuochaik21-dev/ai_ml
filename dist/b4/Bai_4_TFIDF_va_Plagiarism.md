# Buổi 4 — IDF, TF-IDF, cosine và kiểm tra đạo văn

**Ngày học:** 04/11/2026 · **Thời lượng:** khoảng 2–3 giờ  
**Mục tiêu:** tự viết IDF, TF-IDF, cosine, so sánh mọi cặp tài liệu và heatmap để hoàn thành notebook kiểm tra đạo văn.

Mở **Bai_4_TFIDF_va_Plagiarism.ipynb**. Làm cell TODO trước lời giải ở cuối notebook. Ta tiếp tục với hai câu: "mèo ăn cá mèo" và "chó ăn cá". Vocabulary chung là ['ăn', 'cá', 'chó', 'mèo']; mỗi từ luôn ở cùng cột.

## 1. IDF nhìn toàn bộ tài liệu

TF nhìn một tài liệu. IDF nhìn cả corpus: từ có mặt ở mọi tài liệu ít giúp phân biệt; từ chỉ có ở vài tài liệu hữu ích hơn.

- N là tổng số tài liệu.
- df(t) là số tài liệu có chứa từ t. Từ lặp trong cùng câu vẫn chỉ tính một lần.
- Notebook gốc dùng công thức làm trơn: **IDF(t) = log((N + 1) / (df(t) + 1)) + 1**.
- Cộng 1 tránh chia cho 0 và giữ trọng số dương.

~~~python
import numpy as np

def compute_idf(processed_docs, vocabulary):
    num_docs = len(processed_docs)
    idf_values = []
    for word in vocabulary:
        document_frequency = 0
        for doc in processed_docs:
            if word in doc:
                document_frequency += 1
        idf = np.log((num_docs + 1) / (document_frequency + 1)) + 1
        idf_values.append(idf)
    return np.array(idf_values)
~~~

Trong ví dụ, “ăn” và “cá” có df=2 nên IDF=1. “chó” và “mèo” có df=1 nên IDF=log(3/2)+1≈1.405. Nếu từ lặp trong một tài liệu thì df vẫn chỉ tăng một.

## 2. Tạo ma trận TF-IDF

**TF-IDF = TF × IDF** theo từng cột. Với N tài liệu và V từ, ma trận TF có shape (N, V), IDF có shape (V,), và kết quả vẫn là (N, V).

~~~python
def compute_tf_idf(docs):
    processed_docs, vocabulary = create_corpus(docs)
    idf_vector = compute_idf(processed_docs, vocabulary)
    tf_matrix = []
    for doc in processed_docs:
        tf_vector = compute_tf(doc, vocabulary)
        tf_matrix.append(tf_vector)
    tf_matrix = np.array(tf_matrix)
    tf_idf_matrix = tf_matrix * idf_vector
    return tf_idf_matrix, vocabulary
~~~

NumPy tự nhân mỗi hàng TF với cùng vector IDF (broadcasting). Hàm gọi lại hàm nhỏ đã viết hôm qua, để nếu có lỗi ta kiểm tra từng bước.

~~~python
tf_idf_matrix, vocabulary = compute_tf_idf(docs)
print(vocabulary)
print(tf_idf_matrix.shape)  # (2, 4)
~~~

## 3. Cosine so hướng hai vector

**cosine(A, B) = (A · B) / (||A|| × ||B||)**. A·B là tổng tích theo vị trí; ||A|| là độ dài vector. Cosine bằng 1 khi hướng giống nhau; với TF-IDF không âm, cosine thường từ 0 đến 1. Vector toàn 0 không có hướng, nên kiểm tra trước khi chia.

~~~python
def cosine_similarity(vec_a, vec_b):
    dot_product = np.dot(vec_a, vec_b)
    norm_a = np.linalg.norm(vec_a)
    norm_b = np.linalg.norm(vec_b)
    if norm_a == 0 or norm_b == 0:
        return 0.0
    return dot_product / (norm_a * norm_b)
~~~

Tự tính trước: [1, 0] so với [1, 0] có điểm 1; [1, 0] so với [0, 1] có điểm 0.

## 4. So mọi cặp như plagiarism checker

~~~python
def check_plagiarism_all(docs):
    tf_idf_matrix, vocabulary = compute_tf_idf(docs)
    num_docs = len(docs)
    similarity_matrix = np.zeros((num_docs, num_docs))
    for i in range(num_docs):
        for j in range(num_docs):
            similarity_matrix[i, j] = cosine_similarity(
                tf_idf_matrix[i], tf_idf_matrix[j]
            )
    return similarity_matrix
~~~

np.zeros tạo ma trận N×N. i chọn hàng, j chọn cột. Đường chéo thường bằng 1 vì một tài liệu được so với chính nó; ma trận đối xứng vì so i với j bằng so j với i.

~~~python
import matplotlib.pyplot as plt
import seaborn as sns

similarity_matrix = check_plagiarism_all(docs)
sns.heatmap(similarity_matrix, annot=True, fmt=".3f", cmap="YlOrRd")
plt.xlabel("Tài liệu")
plt.ylabel("Tài liệu")
plt.show()
~~~

Heatmap đổi các con số thành màu để dễ so sánh. Hãy đọc cả số và nhãn trục. Điểm cao là tín hiệu văn bản dùng từ tương tự, không tự chứng minh đạo văn; hai bài cùng chủ đề cũng có thể có điểm cao.

## 5. Lỗi thường gặp và cách kiểm tra

| Dấu hiệu | Nguyên nhân | Cách xử lý |
|---|---|---|
| Vector dài ngắn khác nhau | Mỗi tài liệu tự tạo vocabulary | Tạo một vocabulary chung |
| IDF bằng nhau | Đếm số lần từ thay vì số tài liệu có từ | Dùng điều kiện từ có trong tài liệu |
| Chia cho 0 hoặc NaN | Vector rỗng/toàn 0 | Kiểm tra norm trước khi chia |
| Màu heatmap gây hiểu nhầm | Màu không thay thế nhãn và điểm | Đọc số, xem đoạn văn, coi là tín hiệu rà soát |

Nếu thiếu thư viện trong Colab/Jupyter, chạy **%pip install numpy matplotlib seaborn**.

### Tự luyện và tự chấm

1. Thêm tài liệu thứ ba không chứa “mèo”; dự đoán df và IDF trước khi chạy.
2. So tài liệu với chính nó; xem điểm trên đường chéo.
3. Che lời giải và viết lại từ compute_idf đến heatmap.
4. Đổi nội dung docs, chạy lại với dữ liệu mới.

Bạn đạt buổi 4 khi giải thích được N, df, shape (N, V), một giá trị cosine và một ô trong ma trận. Đây là phần cốt lõi của notebook kiểm tra đạo văn đầu tiên.

**Notebook thực hành:** [Bai_4_TFIDF_va_Plagiarism.ipynb](Bai_4_TFIDF_va_Plagiarism.ipynb)

