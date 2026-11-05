# Buổi 3 — Python căn bản, văn bản và TF

**Ngày học:** 03/11/2026 · **Thời lượng:** khoảng 2–3 giờ  
**Mục tiêu:** đọc được Python dùng trong notebook, rồi tự viết tiền xử lý, vocabulary và Term Frequency (TF).

> Bạn không cần biết lập trình trước. Học theo vòng lặp: đọc một dòng → đoán kết quả → chạy → sửa một chi tiết. Đừng cố học thuộc cả notebook.

## Chuẩn bị

Mở **Bai_3_Python_va_TF.ipynb** bằng Google Colab hoặc Jupyter. Chạy từng cell từ trên xuống dưới bằng nút Run hoặc Shift+Enter. Nếu thiếu NumPy, chạy:

~~~python
%pip install numpy
~~~

Trong notebook có lời giải ở cuối. Hãy tự làm cell TODO rồi mới mở lời giải.

## 1. Những khái niệm Python tối thiểu

~~~python
sentence = "Mèo ăn cá"                    # str: một đoạn chữ
words = ["mèo", "ăn", "cá", "mèo"]         # list: nhiều giá trị theo thứ tự
unique_words = set(words)                  # set: bỏ phần tử trùng
counts = {"mèo": 2, "ăn": 1}               # dict: tra giá trị qua khóa
~~~

- **Biến** là cái tên gắn với một giá trị. Dấu bằng ở đây có nghĩa là “gán”.
- **str** giữ chữ; **list** giữ nhiều mục theo thứ tự. Python đếm từ 0 nên words[0] là “mèo”.
- **set** chỉ giữ một bản của mỗi phần tử. Vì set không đảm bảo thứ tự, dùng sorted để sắp xếp vocabulary.
- **dict** lưu cặp khóa–giá trị. counts.get("cá", 0) trả 0 nếu “cá” chưa có.
- **Hàm** gom lệnh dưới một tên. Tham số nhận dữ liệu; return gửi kết quả ra ngoài.
- Các lệnh trong hàm/vòng lặp phải thụt vào 4 dấu cách. Sai thụt lề thường gây IndentationError.

Đọc code bằng ba câu hỏi: dữ liệu đang ở dạng gì? Dòng này đổi hoặc lấy gì? Kết quả được lưu ở đâu?

## 2. preprocess: chuẩn hóa rồi tách từ

~~~python
def preprocess(text):
    text = text.lower()
    words = text.split()
    return words

preprocess("Mèo ĂN Cá")
# ['mèo', 'ăn', 'cá']
~~~

1. def khai báo hàm; khi gọi, câu được đưa vào biến text.
2. lower tạo phiên bản chữ thường. Ta gán lại để dòng sau dùng chữ đã chuẩn hóa.
3. split tách tại khoảng trắng và trả list.
4. return gửi list ra ngoài. print chỉ hiện kết quả, không thay thế return.

split không tự bỏ dấu chấm/phẩy. Đây là cách đơn giản của notebook gốc; quan trọng là dùng cùng quy tắc khi xử lý mọi văn bản.

**Tự làm:** đoán kết quả của preprocess("MÈO, ăn cá!") rồi chạy. Vì sao dấu phẩy vẫn dính vào từ đầu?

## 3. Corpus và vocabulary

**Corpus** là toàn bộ tài liệu. **Vocabulary** là danh sách từ duy nhất làm các cột của vector. Mỗi tài liệu là một hàng; mỗi từ là một cột.

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

- Hai vùng chứa bắt đầu rỗng: list cho các tài liệu đã tách; set cho từ duy nhất.
- Vòng for ngoài xử lý lần lượt mỗi văn bản. append lưu list từ của văn bản đó.
- Vòng for trong thêm từng từ vào set; từ cũ không tạo bản trùng.
- sorted cố định thứ tự cột. Nếu thứ tự từ đổi, các con số trong vector đổi nghĩa.
- Hàm trả hai kết quả; có thể nhận bằng processed_docs, vocabulary = create_corpus(docs).

~~~python
docs = ["mèo ăn cá mèo", "chó ăn cá"]
processed_docs, vocabulary = create_corpus(docs)
print(processed_docs)
print(vocabulary)
~~~

Vocabulary nhận được là ['ăn', 'cá', 'chó', 'mèo']. Mọi vector phải dùng đúng thứ tự bốn cột này.

## 4. TF: tỷ lệ từ trong một tài liệu

TF trả lời: từ này chiếm bao nhiêu phần của tài liệu?

**TF(từ, tài liệu) = số lần từ xuất hiện / tổng số từ trong tài liệu**

Trong ["mèo", "ăn", "cá", "mèo"], TF(mèo) = 2/4 = 0.5; TF(ăn) = 1/4 = 0.25; TF(chó) = 0.

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

- get(word, 0) lấy số đếm cũ; từ mới bắt đầu ở 0 rồi cộng 1.
- Khi tạo vector, duyệt theo vocabulary để số nằm đúng cột.
- Mẫu số là tổng số từ, kể cả từ lặp.
- Tài liệu rỗng có tổng 0; nhánh if tránh chia cho 0.
- np.array đổi list số thành mảng để buổi sau nhân từng cột với IDF.

Với vocabulary ['ăn', 'cá', 'chó', 'mèo'], tài liệu đầu có vector [0.25, 0.25, 0.0, 0.5]. Có bốn từ trong vocabulary nên vector có bốn số.

## 5. Tự luyện theo nấc

1. Chạy preprocess với câu tự chọn; viết kết quả dự đoán trước.
2. Thêm "mèo uống sữa" vào docs. Từ nào mới vào vocabulary?
3. Tính bằng tay TF(cá) trong tài liệu thứ nhất.
4. Thử word_list rỗng. Vector vẫn phải có cùng độ dài vocabulary.
5. Che lời giải, viết lại cả ba hàm bằng hai câu mới.

### Tự chấm buổi 3

Bạn đạt mục tiêu khi tự viết được preprocess, create_corpus, compute_tf; nói được kiểu đầu vào/đầu ra; giải thích được vì sao TF(mèo) = 0.5 và vector có bốn cột. Nếu mắc, xem lại đúng bước đó rồi thử câu mới.

**Notebook thực hành:** [Bai_3_Python_va_TF.ipynb](Bai_3_Python_va_TF.ipynb)  
Ba hàm này là phần đầu của notebook kiểm tra đạo văn trong thư mục b2.

