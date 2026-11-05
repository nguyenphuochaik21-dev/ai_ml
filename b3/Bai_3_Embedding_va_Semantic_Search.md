# Buổi 3 — Python nền tảng, corpus và TF

**Ngày học:** 03/11/2026  
**Thời lượng gợi ý:** 2–3 giờ  
**Mục tiêu:** bắt đầu notebook kiểm tra đạo văn từ dữ liệu trống và tự viết ba hàm đầu tiên.

## Trước khi bắt đầu

Không cần học thuộc thuật ngữ. Hãy làm theo thứ tự: đọc một đoạn code nhỏ, dự đoán output, chạy thử, rồi sửa một chỗ. Nếu chưa biết Python, phần đầu buổi này giải thích đúng những kiểu dữ liệu sẽ dùng.

### Lịch học

| Thời gian | Việc làm |
|---|---|
| 0–25 phút | Hiểu biến, chuỗi, list, set, dict và thụt lề |
| 25–55 phút | Viết hàm preprocess |
| 55–90 phút | Viết create_corpus và kiểm tra vocabulary |
| 90–130 phút | Viết compute_tf bằng dict và NumPy |
| 130–160 phút | Đóng lời giải, tự dựng ba hàm trên corpus mới |

## 1. Năm kiểu dữ liệu

~~~python
text = "mèo ăn cá"                         # str: một chuỗi chữ
words = ["mèo", "ăn", "cá", "mèo"]         # list: nhiều phần tử có thứ tự
unique_words = set(words)                   # set: phần tử không lặp
counts = {"mèo": 2, "ăn": 1}                # dict: khóa → giá trị
vector = [0.5, 0.25, 0.25, 0.0]             # list số; NumPy dùng để tính
~~~

- **Biến** là tên để gọi lại một giá trị. Dấu = gán; nó không so sánh.
- **List** viết bằng ngoặc vuông. Vị trí đầu tiên là 0, nên words[0] là mèo.
- **Set** bỏ phần tử trùng nhau. Vì set không giữ thứ tự cố định, ta sẽ sắp xếp vocabulary bằng sorted.
- **Dict** tra giá trị theo khóa; ví dụ counts["mèo"] trả 2.
- **Hàm** gom các dòng lệnh dưới một tên. Tham số là dữ liệu đầu vào; return gửi kết quả ra ngoài.
- Python dùng thụt lề để xác định dòng nào nằm bên trong hàm/vòng lặp. Thụt 4 dấu cách.

## 2. preprocess: câu thành list từ

~~~python
def preprocess(text):
    text = text.lower()
    words = text.split()
    return words
~~~

Đọc từng dòng:
1. def bắt đầu định nghĩa hàm. Khi gọi preprocess("Mèo ĂN Cá"), chuỗi được đặt vào text.
2. lower tạo chuỗi chữ thường; ta gán lại để bước sau dùng.
3. split cắt tại khoảng trắng, trả list.
4. return trả list đó cho nơi gọi.

Kết quả:

~~~text
preprocess("Mèo ĂN Cá")
→ ["mèo", "ăn", "cá"]
~~~

split không tự xóa dấu chấm/phẩy. Notebook nguồn dùng cách tách đơn giản này; ta giữ cùng quy tắc để vocabulary lúc tạo và lúc kiểm tra thống nhất.

## 3. create_corpus: xử lý mọi văn bản

Corpus nghĩa là toàn bộ danh sách tài liệu. Vocabulary nghĩa là danh sách các từ khác nhau làm cột vector.

~~~python
def create_corpus(docs):
    processed_docs = []
    vocabulary_set = set()

    for text in docs:
        words = preprocess(text)
        processed_docs.append(words)
        for word in words:
            vocabulary_set.add(word)

    vocabulary = sorted(vocabulary_set)
    return processed_docs, vocabulary
~~~

- Tạo hai vùng chứa rỗng: list cho từng tài liệu đã xử lý, set cho từ không trùng.
- Vòng ngoài lấy từng text. preprocess biến text thành list; append giữ lại list đó.
- Vòng trong lấy từng word. add đưa từ vào set; nếu từ lặp lại, set vẫn chỉ chứa một bản.
- sorted tạo một thứ tự cột cố định.
- Hàm trả về hai giá trị. Ta nhận bằng: processed_docs, vocabulary = create_corpus(docs).

Ví dụ:

~~~python
docs = ["mèo ăn cá mèo", "chó ăn cá"]
processed_docs, vocabulary = create_corpus(docs)
print(processed_docs)
print(vocabulary)
~~~

Kết quả:

~~~text
[['mèo', 'ăn', 'cá', 'mèo'], ['chó', 'ăn', 'cá']]
['ăn', 'cá', 'chó', 'mèo']
~~~

Mọi vector dùng thứ tự cột ['ăn','cá','chó','mèo']. Đổi thứ tự cột sẽ đổi nghĩa của từng con số.

## 4. compute_tf: đếm tỷ lệ từ trong một tài liệu

Term Frequency trả lời: trong tài liệu này, từ đó chiếm tỷ lệ bao nhiêu?

**TF(word, doc) = số lần word xuất hiện / tổng số từ của doc**

Với d0 = ['mèo','ăn','cá','mèo']: TF(mèo)=2/4=0.5; TF(ăn)=1/4=0.25; TF(chó)=0.

~~~python
import numpy as np

def compute_tf(word_list, vocabulary):
    word_count = {}
    for word in word_list:
        word_count[word] = word_count.get(word, 0) + 1

    total_words = len(word_list)
    tf_vector = []
    for word in vocabulary:
        count = word_count.get(word, 0)
        if total_words == 0:
            tf_vector.append(0)
        else:
            tf_vector.append(count / total_words)

    return np.array(tf_vector)
~~~

- word_count = {} tạo dict đếm từ.
- get(word, 0) lấy số cũ; nếu từ chưa có, bắt đầu từ 0. Sau đó cộng 1.
- Ta đi theo vocabulary để từng tỷ lệ nằm đúng cột.
- Tài liệu rỗng không được chia cho 0; ở đây ta trả vector số 0.
- np.array đổi list số thành mảng NumPy để buổi sau nhân từng ô với IDF.

Với vocabulary ['ăn','cá','chó','mèo'], kết quả d0 là:

~~~text
[0.25, 0.25, 0.00, 0.50]
~~~

Shape của vector là (4,): một số cho mỗi từ vựng.

## 5. Bài tập có thứ tự

1. Chạy preprocess trên câu của bạn. Đoán output trước khi chạy.
2. Thêm câu “mèo uống sữa” vào docs. Từ nào mới vào vocabulary?
3. Với docs ví dụ, tính bằng tay TF của “cá” trong câu thứ nhất.
4. Đổi thứ tự vocabulary và xem các vị trí vector đổi thế nào.
5. Gọi compute_tf trên list rỗng. Kết quả phải có độ dài bằng vocabulary và không chia cho 0.

## Tự kiểm tra cuối buổi

Đóng lời giải và viết lại ba hàm trong một notebook trắng. Bạn đạt mục tiêu nếu:

- preprocess nhận str và trả list[str];
- create_corpus nhận list[str] và trả list tài liệu cùng vocabulary đã sắp xếp;
- compute_tf trả vector có độ dài bằng vocabulary;
- giải thích được một giá trị cụ thể trong vector, ví dụ 0.5 là 2/4.

Nếu chưa đạt, chỉ quay lại hàm còn vướng. Đừng chép cả notebook; tập trung theo dõi kiểu dữ liệu đầu vào/đầu ra.

## Liên hệ với notebook gốc

Mở [notebook thực hành buổi 3](Bai_3_Embedding_va_Semantic_Search.ipynb). Nó có các cell TODO nhỏ để bạn gõ lại hàm. Notebook plagiarism gốc dùng bốn hàm này để tạo TF-IDF cho nhiều tài liệu.