window.NLP_LABS = [
  {
    id: "value-types", group: "day1-foundations", level: "1 · GIÁ TRỊ VÀ BIẾN", title: "Gán tên cho dữ liệu",
    problem: "Máy cần lưu câu chữ và con số để dùng lại ở các bước sau.",
    why: "Biến là nhãn gắn với một giá trị. Dùng biến giúp ta gọi lại đúng dữ liệu, đổi dữ liệu ở một chỗ và truyền nó cho hàm.",
    input: "Một chuỗi tên và một số tuổi.", output: "Tên được in ra; tuổi vẫn là số nguyên để còn tính toán.",
    steps: [
      ["name = \"An\"", "Dấu = gán chuỗi \"An\" cho biến name. Dấu này không hỏi hai vế có bằng nhau không.", "Bỏ dòng này thì name chưa tồn tại; print(name) sẽ báo NameError."],
      ["age = 20", "20 không có dấu nháy nên là số nguyên int, không phải chữ \"20\".", "Nếu viết age = \"20\", phép cộng số tuổi sẽ thành ghép chữ hoặc báo lỗi."],
      ["print(name)", "print nhận giá trị cần hiện ra màn hình. Nó giúp ta nhìn thấy kết quả lúc học.", "Bỏ dòng này không làm mất biến, nhưng ta không thấy tên được in."],
      ["type(age).__name__", "type hỏi kiểu dữ liệu; __name__ lấy tên ngắn của kiểu đó, ở đây là int.", "Không kiểm tra kiểu thì dễ nhầm số 20 với chuỗi \"20\"."]
    ],
    starter: `name = "An"
age = 20
print(name)
print(type(age).__name__)
print(age + 1)`,
    challenge: "Chạy thử rồi đổi age thành 21. Trước khi chạy lại, đoán ba dòng output sẽ thay đổi thế nào.",
    tests: `assert isinstance(name, str), "name cần là chuỗi"
assert isinstance(age, int), "age cần là số nguyên"
assert age + 1 == 22, "Đổi age thành 21 để phép cộng cho kết quả 22"`,
    hint1: "Chuỗi được đặt trong dấu nháy. Số nguyên không cần dấu nháy.",
    hint2: "Đổi dòng thứ hai thành age = 21. Các dòng print phía dưới đọc lại biến age.",
    solution: `name = "An"
age = 21
print(name)
print(type(age).__name__)
print(age + 1)`,
    expected: "An\nint\n22"
  },
  {
    id: "lists-loop", group: "day1-foundations", level: "2 · DANH SÁCH VÀ VÒNG LẶP", title: "Một câu thành danh sách từ",
    problem: "Muốn kiểm tra từng từ thì trước hết phải có chỗ chứa nhiều từ và cách đi qua từng từ.",
    why: "Danh sách giữ các phần tử theo thứ tự. Vòng for lấy lần lượt từng phần tử; đây chính là thao tác ta sẽ dùng để lọc và đếm token.",
    input: "Chuỗi câu: I love NLP.", output: "Danh sách ba từ; từng từ được in ra theo thứ tự.",
    steps: [
      ["sentence = \"I love NLP\"", "Tạo chuỗi đầu vào. Dấu nháy cho Python biết đây là chữ.", "Nếu không có đầu vào, ta không có câu để tách."],
      ["words = sentence.split()", "split tách chuỗi ở khoảng trắng và trả về list. Đây là bản học nhập môn, chưa xử lý dấu câu như SpaCy.", "Không tách thì words vẫn là một chuỗi; ta khó hỏi riêng words[0]."],
      ["words[0]", "Ngoặc vuông lấy vị trí. Python đếm từ 0 nên vị trí 0 là phần tử đầu tiên.", "Dùng words[1] sẽ lấy love; dùng words[3] sẽ vượt khỏi danh sách và gây IndexError."],
      ["for word in words:", "Vòng lặp gán từng phần tử của words vào word, từ trái sang phải.", "Không có vòng lặp thì ta phải viết một dòng cho từng từ; câu dài sẽ rất bất tiện."]
    ],
    starter: `sentence = "I love NLP"
words = sentence.split()
print(words)
print(words[0])

for word in words:
    print(word)`,
    challenge: "Đổi từ trong câu thành I love Python, chạy lại và xem words[0] vẫn là phần tử nào.",
    tests: `assert words == sentence.split(), "words là danh sách do split tạo ra"
assert words[0] == sentence.split()[0], "Chỉ số 0 là phần tử đầu tiên"
assert len(words) == len(sentence.split()), "Mỗi từ tách ra là một phần tử"`,
    hint1: "split() trả về list. Dùng len(words) để đếm số phần tử.",
    hint2: "Danh sách [\"I\", \"love\", \"NLP\"] có chỉ số lần lượt là 0, 1, 2.",
    solution: `sentence = "I love NLP"
words = sentence.split()
print(words)
print(words[0])
for word in words:
    print(word)`,
    expected: "['I', 'love', 'NLP']\nI\nI\nlove\nNLP"
  },
  {
    id: "if-count", group: "day1-foundations", level: "3 · ĐIỀU KIỆN VÀ BỘ ĐẾM", title: "Đếm từ cảm xúc bằng luật",
    problem: "Ta có danh sách token. Làm sao đếm riêng từ tích cực mà không đếm từ khác?",
    why: "if chỉ chạy khối lệnh khi điều kiện đúng. count là bộ tích lũy: bắt đầu từ 0 rồi tăng 1 mỗi lần gặp token cần đếm.",
    input: "Các token love, bad, love, great.", output: "Có ba token thuộc nhóm tích cực.",
    steps: [
      ["positive_words = {\"love\", \"great\"}", "Tạo set từ tích cực. in kiểm tra nhanh token có thuộc tập hay không.", "Nếu danh sách từ khóa không có, chương trình không biết từ nào cần đếm."],
      ["count = 0", "Khởi tạo bộ đếm trước khi lặp vì lúc đầu chưa gặp từ tích cực nào.", "Nếu bỏ, count chưa tồn tại; nếu bắt đầu ở 1 thì kết quả lệch một đơn vị."],
      ["if token in positive_words:", "Điều kiện đúng khi token đang xét thuộc set tích cực.", "Không có if thì mọi token, kể cả bad, đều bị đếm."],
      ["count += 1", "Cộng thêm một mà không phải viết lại count = count + 1.", "Nếu bỏ, chương trình nhận ra từ nhưng không ghi lại số lượng."],
      ["print(count)", "Hiện tổng sau khi vòng lặp đã xét hết token.", "Nếu đặt trong vòng lặp, ta sẽ in kết quả trung gian nhiều lần."]
    ],
    starter: `tokens = ["love", "bad", "love", "great"]
positive_words = {"love", "great"}
count = 0

for token in tokens:
    if token in positive_words:
        count += 1

print(count)`,
    challenge: "Thêm từ happy vào positive_words và thêm happy vào tokens. Bộ đếm cần tăng thêm một.",
    tests: `assert count == 4, "Sau khi thêm happy vào set và tokens, count cần bằng 4"`,
    hint1: "Thêm happy vào cả hai chỗ: danh sách token và tập từ tích cực.",
    hint2: "Set thành {\"love\", \"great\", \"happy\"}; list tokens thêm một phần tử \"happy\".",
    solution: `tokens = ["love", "bad", "love", "great", "happy"]
positive_words = {"love", "great", "happy"}
count = 0
for token in tokens:
    if token in positive_words:
        count += 1
print(count)`,
    expected: "4"
  },
  {
    id: "function-return", group: "day1-foundations", level: "4 · HÀM VÀ RETURN", title: "Gom một thao tác thành hàm",
    problem: "Nếu nhiều câu đều cần chuyển về chữ thường, ta không muốn chép lại cùng một thao tác nhiều lần.",
    why: "Hàm đặt tên cho một thao tác có thể dùng lại. Tham số word nhận đầu vào; return gửi kết quả ra ngoài để dòng khác dùng tiếp.",
    input: "Chuỗi GREAT.", output: "Hàm trả về great; chữ gốc vẫn là GREAT.",
    steps: [
      ["def lowercase(word):", "def bắt đầu định nghĩa hàm. word là tên tham số, nhận giá trị lúc gọi hàm.", "Không có def, tên lowercase chưa được gắn với thao tác nào."],
      ["return word.lower()", "Gọi phương thức lower trên chuỗi rồi trả chuỗi mới ra ngoài.", "Nếu chỉ gọi word.lower() mà không return, kết quả không được chuyển về nơi gọi."],
      ["result = lowercase(\"GREAT\")", "Gọi hàm với đầu vào GREAT; giá trị trả về được gán vào result.", "Nếu không gọi, thân hàm chưa chạy."],
      ["print(result)", "Hiện kết quả được hàm trả về.", "Tên result vẫn có giá trị dù không in, nhưng ta không nhìn thấy nó."]
    ],
    starter: `def lowercase(word):
    # TODO: trả về bản chữ thường của word
    return word

result = lowercase("GREAT")
print(result)`,
    challenge: "Sửa đúng một dòng trong hàm để gọi chữ thường và trả kết quả. Không sửa dòng gọi hàm.",
    tests: `assert lowercase("GREAT") == "great", "Hàm phải trả chữ thường"
assert result == "great", "result nhận giá trị do return gửi ra"`,
    hint1: "Chuỗi có phương thức .lower(). Hãy gọi nó trên word.",
    hint2: "Dòng cần viết là return word.lower(). return phải nằm thụt vào bên trong hàm.",
    solution: `def lowercase(word):
    return word.lower()

result = lowercase("GREAT")
print(result)`,
    expected: "great"
  },
  {
    id: "nlp-preprocess", group: "day1-nlp", level: "5 · GHÉP PYTHON VỚI NLP", title: "Tự viết hàm tiền xử lý đầu tiên",
    problem: "Một câu có chữ hoa, từ phổ biến và nhiều dạng từ. Ta cần đưa nó về những mảnh dễ so sánh.",
    why: "re là công cụ tìm mẫu chữ; danh sách stop words lọc từ đã chọn; PorterStemmer gom dạng từ. Hàm ghép các bước để mọi câu mới đi qua cùng một quy trình.",
    input: "I loved this movie and will watch it again.", output: "['love', 'movi', 'watch']",
    steps: [
      ["import re", "Nạp thư viện chuẩn để tìm các nhóm ký tự theo mẫu.", "Nếu không có re, tên re chưa tồn tại để tokenize dùng."],
      ["PorterStemmer()", "Tạo bộ rút gọn từ từ NLTK. Nó không cần tải corpus để stemming.", "Nếu không tạo stemmer, không thể gọi stem trên từ."],
      ["re.findall(..., sentence.lower())", "Chuyển chữ về thường rồi tìm từng cụm chữ a-z; kết quả là list token. Đây là tokenizer minh họa, không phải thay thế hoàn toàn spaCy.", "Không lower thì Love và love khác nhau; không tách token thì không lọc từng từ."],
      ["if token not in STOP_WORDS", "Chỉ giữ token không thuộc tập từ cần bỏ.", "Bỏ điều kiện thì stop words vẫn còn; bỏ not thì chỉ giữ stop words."],
      ["stemmer.stem(token)", "Rút mỗi token còn lại về stem để khớp với vocabulary cùng quy ước.", "Bỏ bước này thì loved và love có thể bị xem là hai mục từ khác nhau."]
    ],
    starter: `import re
from nltk.stem import PorterStemmer

STOP_WORDS = {"i", "this", "and", "will", "it", "again"}
stemmer = PorterStemmer()

def preprocess_text(sentence):
    tokens = re.findall(r"[a-z]+", sentence.lower())
    useful = [token for token in tokens if token not in STOP_WORDS]
    return [stemmer.stem(token) for token in useful]

print(preprocess_text("I loved this movie and will watch it again"))`,
    challenge: "Đổi câu đầu vào thành 'I hated this boring movie'. Hãy xem tokenization, stop words và stemming chạy theo thứ tự nào.",
    tests: `assert preprocess_text("I loved this movie and will watch it again") == ["love", "movi", "watch"]
assert preprocess_text("I hated this boring movie") == ["hate", "bore", "movi"]`,
    hint1: "Token hóa tạo list trước. Sau đó list comprehension lọc. Cuối cùng một list comprehension khác gọi stem.",
    hint2: "Giữ nguyên công thức; chỉ thay chuỗi trong print để quan sát câu khác. Từ loved thành love sau khi stemming.",
    solution: `import re
from nltk.stem import PorterStemmer

STOP_WORDS = {"i", "this", "and", "will", "it", "again"}
stemmer = PorterStemmer()

def preprocess_text(sentence):
    tokens = re.findall(r"[a-z]+", sentence.lower())
    useful = [token for token in tokens if token not in STOP_WORDS]
    return [stemmer.stem(token) for token in useful]

print(preprocess_text("I loved this movie and will watch it again"))`,
    expected: "['love', 'movi', 'watch']",
    note: "Trong notebook, SpaCy tạo token và model tiếng Anh cung cấp lemma. Bài chạy dùng re để tách chữ đơn giản, chỉ để học kiểu dữ liệu; hai kết quả không được coi là tương đương hoàn toàn."
  },
  {
    id: "spam-preprocess", group: "day2-preprocess", level: "6 · TIỀN XỬ LÝ TIN NHẮN", title: "Ghép các bước xử lý thành một hàm",
    problem: "Các tin nhắn phải qua cùng một quy trình trước khi biến thành đặc trưng.",
    why: "Tách hàm nhỏ giúp biết dữ liệu đổi ở đâu, kiểm tra từng bước, và tránh mỗi tin nhắn bị xử lý theo cách khác nhau.",
    input: "YOU are WINNING prizes!", output: "['win', 'prize']",
    steps: [
      ["text.lower()", "Đưa chữ về thường trước khi so sánh.", "Không làm vậy, YOU không trùng you trong stop words."],
      ["translate(maketrans(...))", "Xóa dấu câu ASCII trước khi tách từ.", "Dấu ! có thể dính vào prizes! và không khớp từ khóa prizes."],
      ["text.split()", "Tách theo khoảng trắng để có list từ. Đây là cách học đơn giản; notebook dùng nltk.word_tokenize.", "Nếu chưa thành list, vòng lặp sau chưa xử lý từng từ."],
      ["token not in STOP_WORDS", "Lọc từ phổ biến đã chọn.", "Nếu giữ you/are, vocabulary tăng dù chúng ít giúp phân biệt."],
      ["stemmer.stem(token)", "Chuẩn hóa biến thể của từ bằng Porter.", "Nếu không cùng quy tắc với vocabulary, từ đã học và từ mới có thể không khớp."]
    ],
    starter: `import string
from nltk.stem import PorterStemmer

STOP_WORDS = {"you", "are"}
stemmer = PorterStemmer()

def preprocess_text(text):
    text = text.lower()
    text = text.translate(str.maketrans("", "", string.punctuation))
    tokens = text.split()
    tokens = [token for token in tokens if token not in STOP_WORDS]
    return [stemmer.stem(token) for token in tokens]

print(preprocess_text("YOU are WINNING prizes!"))`,
    challenge: "Chạy code. Thử xóa dòng xóa dấu câu và quan sát vì sao token cuối khác đi.",
    tests: `assert preprocess_text("YOU are WINNING prizes!") == ["win", "prize"]`,
    hint1: "Kiểm tra dạng dữ liệu sau mỗi phép gán: chuỗi → chuỗi → list → list đã lọc → list stem.",
    hint2: "Dấu chấm gọi phương thức trên chuỗi; translate nhận bảng dịch do maketrans tạo.",
    solution: `import string
from nltk.stem import PorterStemmer

STOP_WORDS = {"you", "are"}
stemmer = PorterStemmer()

def preprocess_text(text):
    text = text.lower()
    text = text.translate(str.maketrans("", "", string.punctuation))
    tokens = text.split()
    tokens = [token for token in tokens if token not in STOP_WORDS]
    return [stemmer.stem(token) for token in tokens]

print(preprocess_text("YOU are WINNING prizes!"))`,
    expected: "['win', 'prize']"
  },
  {
    id: "label-encoder", group: "day2-bow", level: "7 · NHÃN CHỮ THÀNH NHÃN SỐ", title: "Vì sao ham và spam thành 0 và 1?",
    problem: "Bộ phân loại cần nhận diện hai lớp nhất quán; con người lại muốn giữ tên dễ đọc.",
    why: "LabelEncoder ghi nhớ mối ánh xạ giữa nhãn chữ và mã số. fit_transform vừa học nhãn có những lớp nào vừa trả mảng số.",
    input: "['ham', 'spam', 'ham']", output: "classes ['ham', 'spam']; mã [0, 1, 0]",
    steps: [
      ["LabelEncoder()", "Tạo đối tượng sẽ lưu ánh xạ nhãn.", "Nếu không có đối tượng, không có chỗ giữ quy tắc chuyển đổi."],
      ["fit_transform(labels)", "fit tìm các lớp; transform đổi từng nhãn theo thứ tự đã học.", "Chỉ gọi fit thì chưa đổi nhãn; chỉ transform trước khi fit thì encoder chưa biết lớp."],
      ["classes_", "Cho biết số nào ứng với nhãn nào.", "Nếu chỉ nhìn [0, 1, 0], ta không biết 0 là ham hay spam."],
      ["tolist()", "Đổi mảng NumPy sang list dễ đọc khi in.", "Không đổi thì vẫn là mảng; giá trị bên trong không thay đổi."]
    ],
    starter: `from sklearn.preprocessing import LabelEncoder

labels = ["ham", "spam", "ham"]
encoder = LabelEncoder()
numeric_labels = encoder.fit_transform(labels)
print(list(encoder.classes_))
print(numeric_labels.tolist())`,
    challenge: "Thêm một nhãn spam vào cuối labels. Kiểm tra số nhãn mã hóa có bằng số nhãn đầu vào không.",
    tests: `assert len(numeric_labels) == len(labels), "Mỗi nhãn cần có một mã"
assert set(numeric_labels.tolist()) <= {0, 1}, "Hai lớp được mã thành 0/1"
assert list(encoder.classes_) == ["ham", "spam"]`,
    hint1: "Mảng kết quả và list đầu vào có cùng số phần tử.",
    hint2: "Dòng labels có thể thành [\"ham\", \"spam\", \"ham\", \"spam\"]. Sau đó chạy lại cả cell.",
    solution: `from sklearn.preprocessing import LabelEncoder
labels = ["ham", "spam", "ham", "spam"]
encoder = LabelEncoder()
numeric_labels = encoder.fit_transform(labels)
print(list(encoder.classes_))
print(numeric_labels.tolist())`,
    expected: "['ham', 'spam']\n[0, 1, 0]"
  },
  {
    id: "bow-vector", group: "day2-bow", level: "8 · VOCABULARY VÀ VECTOR", title: "Tạo một hàng Bag-of-Words",
    problem: "Mô hình không nhận được list từ. Ta cần biến mỗi câu thành vector có cùng số cột.",
    why: "Từ điển xác định các cột. Vector bắt đầu bằng số 0; mỗi lần gặp từ, tăng đúng cột của nó. Sắp từ điển ổn định để cột không đổi thứ tự.",
    input: "messages chứa free, win, meeting, prize.", output: "Từ 'free' hai lần và 'prize' một lần được đếm vào các cột tương ứng.",
    steps: [
      ["set() và add(token)", "Set giữ mỗi từ duy nhất; add thêm từ chưa có.", "Nếu dùng list trực tiếp, một từ lặp lại sẽ tạo nhiều cột trùng nhau."],
      ["sorted(dictionary)", "Đổi tập hợp thành list có thứ tự ổn định.", "Set không cam kết thứ tự; nếu thứ tự cột đổi, ý nghĩa vector cũng đổi."],
      ["np.zeros(len(vocabulary))", "Tạo một ô số 0 cho từng cột từ vựng.", "Nếu độ dài sai, vector không khớp số đặc trưng model mong đợi."],
      ["vocabulary.index(token)", "Tìm cột gắn với token đang xét.", "Nếu không tìm cột, ta không biết tăng ô nào."],
      ["features[index] += 1", "Đếm thêm một lần xuất hiện; từ lặp lại làm số đếm lớn hơn 1.", "Nếu chỉ gán 1, ta biến Bag-of-Words thành chỉ báo có/không thay vì đếm tần suất."]
    ],
    starter: `import numpy as np

messages = [["free", "win"], ["meeting", "tomorrow"], ["free", "free", "prize"]]

def create_dictionary(messages):
    dictionary = set()
    for tokens in messages:
        for token in tokens:
            dictionary.add(token)
    return dictionary

vocabulary = sorted(create_dictionary(messages))

def create_features(tokens, vocabulary):
    features = np.zeros(len(vocabulary), dtype=int)
    for token in tokens:
        if token in vocabulary:
            index = vocabulary.index(token)
            features[index] += 1
    return features

vector = create_features(messages[2], vocabulary)
print(vocabulary)
print(vector.tolist())`,
    challenge: "Đổi messages[2] thành messages[0]. Đếm tay rồi xác nhận vector vẫn có cùng số cột.",
    tests: `assert vocabulary == ["free", "meeting", "prize", "tomorrow", "win"]
assert len(vector) == len(vocabulary), "Một giá trị cho mỗi cột"
assert int(vector.sum()) == len(messages[2]), "Tổng số đếm bằng số token trong câu"`,
    hint1: "sorted làm thứ tự từ điển rõ ràng; index trả về vị trí trong list.",
    hint2: "Với messages[2], free ở cột 0 xuất hiện hai lần; prize ở cột 2 xuất hiện một lần.",
    solution: `import numpy as np
messages = [["free", "win"], ["meeting", "tomorrow"], ["free", "free", "prize"]]
dictionary = {token for tokens in messages for token in tokens}
vocabulary = sorted(dictionary)
def create_features(tokens, vocabulary):
    features = np.zeros(len(vocabulary), dtype=int)
    for token in tokens:
        if token in vocabulary:
            features[vocabulary.index(token)] += 1
    return features
vector = create_features(messages[2], vocabulary)
print(vocabulary)
print(vector.tolist())`,
    expected: "['free', 'meeting', 'prize', 'tomorrow', 'win']\n[2, 0, 1, 0, 0]",
    note: "Đoạn thực hành sắp xếp vocabulary để cột ổn định. Notebook nguồn dùng set trực tiếp và tạo list(dictionary) khi tìm index; ta sẽ chỉ rõ khác biệt này thay vì che mất rủi ro."
  },
  {
    id: "train-split", group: "day2-bow", level: "9 · CHIA DỮ LIỆU", title: "Để dành ví dụ mô hình chưa học",
    problem: "Nếu chỉ kiểm tra trên câu đã dùng để học, ta chưa biết model có dự đoán được câu mới không.",
    why: "train_test_split chia cặp đặc trưng/nhãn cùng nhau để mỗi hàng X vẫn đi với đúng y. random_state giúp tái tạo cách chia trong bài học.",
    input: "Năm vector và năm nhãn tương ứng.", output: "Bốn ví dụ train, một ví dụ test khi test_size=0.2.",
    steps: [
      ["X, y", "X chứa các hàng đặc trưng; y chứa nhãn cùng thứ tự.", "Nếu số hàng X và số nhãn y không khớp, không thể biết nhãn của tin nào."],
      ["test_size=0.2", "Chọn 20% làm tập test.", "Nếu test_size quá lớn, còn ít ví dụ để học; quá nhỏ thì đánh giá kém ổn định."],
      ["random_state=0", "Dùng cùng cách xáo/chia khi chạy lại.", "Bỏ random_state thì các con số đầu ra có thể đổi mỗi lần."],
      ["X_train, X_test, y_train, y_test", "Nhận bốn phần: đặc trưng và nhãn của train/test.", "Xáo riêng X và y sẽ làm ghép nhầm nhãn với tin nhắn."]
    ],
    starter: `from sklearn.model_selection import train_test_split

X = [[1, 0], [0, 1], [2, 0], [0, 2], [1, 1]]
y = [0, 1, 0, 1, 0]

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=0
)
print(len(X_train), len(X_test))
print(len(y_train), len(y_test))`,
    challenge: "Đổi test_size thành 0.4. Dự đoán mỗi tập sẽ có bao nhiêu hàng trước khi chạy.",
    tests: `assert len(X_train) + len(X_test) == len(X), "Không mất hàng"
assert len(y_train) == len(X_train) and len(y_test) == len(X_test), "X và y phải được chia đồng bộ"`,
    hint1: "Test có 20% của 5 hàng, tức một hàng. Phần còn lại là train.",
    hint2: "Scikit-learn chia X và y cùng một lần gọi để giữ thứ tự tương ứng.",
    solution: `from sklearn.model_selection import train_test_split
X = [[1, 0], [0, 1], [2, 0], [0, 2], [1, 1]]
y = [0, 1, 0, 1, 0]
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.4, random_state=0)
print(len(X_train), len(X_test))
print(len(y_train), len(y_test))`,
    expected: "4 1\n4 1"
  },
  {
    id: "naive-bayes", group: "day3-model", level: "10 · FIT VÀ PREDICT", title: "Cho Naive Bayes học ví dụ nhỏ",
    problem: "Ta đã có các hàng số và nhãn đúng. Bây giờ cần một thuật toán học mối liên hệ giữa chúng.",
    why: "MultinomialNB dành cho đặc trưng đếm. fit học từ X_train và y_train; predict nhận một hàng mới có đúng các cột đã học.",
    input: "Bốn hàng đếm từ; nhãn spam/ham.", output: "Với cột đầu biểu diễn từ free, một hàng có free được dự đoán spam.",
    steps: [
      ["MultinomialNB()", "Tạo một model cho dữ liệu dạng số đếm.", "Nếu chưa tạo, không có đối tượng để học."],
      ["model.fit(X_train, y_train)", "Cho model nhìn các đặc trưng và nhãn đúng để ước lượng quy luật.", "Nếu chỉ đưa X mà không có y, model không biết đáp án nào thuộc lớp nào."],
      ["model.predict([[1, 0, 0]])", "Dự đoán một ví dụ mới; hai lớp ngoặc vuông nghĩa là một batch có một hàng.", "Vector thiếu/thừa cột sẽ không cùng hình dạng với dữ liệu train."],
      ["prediction[0]", "Lấy nhãn của tin duy nhất trong batch.", "Không cần nếu muốn giữ kết quả dạng mảng; dùng khi muốn một chuỗi nhãn."]
    ],
    starter: `from sklearn.naive_bayes import MultinomialNB

X_train = [[2, 0, 1], [1, 0, 2], [0, 2, 0], [0, 1, 0]]
y_train = ["spam", "spam", "ham", "ham"]

model = MultinomialNB()
model.fit(X_train, y_train)
prediction = model.predict([[1, 0, 0]])
print(prediction[0])`,
    challenge: "Đổi vector dự đoán thành [0, 2, 0]. Cột thứ hai ở ví dụ này có nhiều tín hiệu ham hơn.",
    tests: `assert list(model.classes_) == ["ham", "spam"]
assert model.predict([[1, 0, 0]])[0] == "spam", "Từ ở cột 0 gắn với ví dụ spam"`,
    hint1: "Các hàng đầu tiên có số lớn ở cột 0 và nhãn spam; các hàng sau có số ở cột 1 và nhãn ham.",
    hint2: "Dòng fit nhận đúng hai phần X_train và y_train. Không fit trên câu test.",
    solution: `from sklearn.naive_bayes import MultinomialNB
X_train = [[2, 0, 1], [1, 0, 2], [0, 2, 0], [0, 1, 0]]
y_train = ["spam", "spam", "ham", "ham"]
model = MultinomialNB()
model.fit(X_train, y_train)
print(model.predict([[1, 0, 0]])[0])`,
    expected: "spam",
    note: "Đây là dữ liệu đồ chơi để hiểu fit/predict, không phải dataset 5.572 tin của notebook."
  },
  {
    id: "accuracy-loop", group: "day3-model", level: "11 · ĐO KẾT QUẢ", title: "Tự tính accuracy bằng vòng lặp",
    problem: "Muốn biết trong bốn câu dự đoán, có bao nhiêu câu đúng.",
    why: "Accuracy là số nhãn dự đoán đúng chia cho tổng số ví dụ. Viết tay phép tính trước giúp hiểu accuracy_score làm gì.",
    input: "Nhãn thật và nhãn dự đoán cùng bốn vị trí.", output: "Ba trên bốn đúng, accuracy bằng 0.75.",
    steps: [
      ["actual[i] == predicted[i]", "So sánh nhãn thật và dự đoán ở cùng vị trí.", "So sánh sai cặp vị trí thì kết quả đánh giá vô nghĩa."],
      ["correct += 1", "Tăng số lần đúng.", "Nếu bỏ, biến correct luôn 0."],
      ["correct / len(actual)", "Chia số đúng cho tổng số ví dụ.", "Chỉ đếm số đúng thì không so sánh được tập lớn và tập nhỏ."]
    ],
    starter: `actual = ["spam", "ham", "spam", "ham"]
predicted = ["spam", "spam", "spam", "ham"]
correct = 0

for index in range(len(actual)):
    if actual[index] == predicted[index]:
        correct += 1

accuracy = correct / len(actual)
print(accuracy)`,
    challenge: "Đếm tay bao nhiêu cặp trùng nhau trước khi bấm Chạy & kiểm tra.",
    tests: `assert correct == 3, "Có ba dự đoán đúng"
assert accuracy == 0.75, "3 chia 4 bằng 0.75"`,
    hint1: "Ở vị trí 1, spam không bằng ham; ba vị trí còn lại khớp.",
    hint2: "Accuracy không nói loại sai lầm nào xảy ra; vì vậy khi lọc spam còn cần xem precision/recall.",
    solution: `actual = ["spam", "ham", "spam", "ham"]
predicted = ["spam", "spam", "spam", "ham"]
correct = sum(1 for a, p in zip(actual, predicted) if a == p)
accuracy = correct / len(actual)
print(accuracy)`,
    expected: "0.75"
  },
  {
    id: "predict-fix", group: "day3-rebuild", level: "12 · SỬA LỖI THẬT TRONG NOTEBOOK", title: "Sửa biến bị truyền nhầm",
    problem: "Notebook đã tiền xử lý câu mới nhưng lại đưa câu thô vào hàm tạo vector.",
    why: "create_features cần list token, không phải chuỗi. Chuỗi khi lặp sẽ cho từng ký tự; vector kết quả không biểu diễn đúng từ của câu.",
    input: "text là chuỗi; processed_text là list token.", output: "Hàm phải dùng processed_text để tạo vector rồi mới gọi model.predict.",
    steps: [
      ["processed_text = preprocess_text(text)", "Chuẩn hóa câu thành list token.", "Nếu dùng câu thô ở bước kế, kết quả xử lý vừa tạo bị bỏ phí."],
      ["create_features(processed_text, vocabulary)", "Đổi list token thành vector cùng thứ tự cột model đã học.", "Truyền text thô khiến vòng lặp đi qua ký tự thay vì từ."],
      ["reshape(1, -1)", "Thêm một hàng để biểu diễn một mẫu.", "Scikit-learn muốn hai chiều: số mẫu × số đặc trưng."],
      ["inverse_transform(...)[0]", "Đổi mã 0/1 về chữ ham/spam và lấy nhãn đầu tiên.", "Nếu thiếu bước đổi ngược, kết quả là số khó đọc." ]
    ],
    starter: `from sklearn.naive_bayes import MultinomialNB
import numpy as np

vocabulary = ["free", "meeting", "prize"]
model = MultinomialNB().fit([[1, 0, 1], [0, 1, 0]], ["spam", "ham"])

def preprocess_text(text):
    return [word for word in text.lower().split() if word in vocabulary]

def create_features(tokens, vocabulary):
    features = np.zeros(len(vocabulary), dtype=int)
    for token in tokens:
        if token in vocabulary:
            features[vocabulary.index(token)] += 1
    return features

def predict(text):
    processed_text = preprocess_text(text)
    features = create_features(text, vocabulary)  # tìm và sửa lỗi ở dòng này
    features = np.array(features).reshape(1, -1)
    return model.predict(features)[0]

print(predict("free prize"))`,
    challenge: "Sửa đúng một dòng trong predict. Sau đó bấm Chạy & kiểm tra để kiểm tra cả kiểu dữ liệu và nhãn.",
    tests: `assert isinstance(preprocess_text("free prize"), list)
assert predict("free prize") == "spam", "Câu có free/prize cần được mã hóa từ token đã xử lý"`,
    hint1: "Ở dòng lỗi, text là chuỗi còn processed_text là list. Hàm feature cần list từ.",
    hint2: "Thay đối số text trong create_features bằng processed_text.",
    solution: `from sklearn.naive_bayes import MultinomialNB
import numpy as np
vocabulary = ["free", "meeting", "prize"]
model = MultinomialNB().fit([[1, 0, 1], [0, 1, 0]], ["spam", "ham"])
def preprocess_text(text):
    return [word for word in text.lower().split() if word in vocabulary]
def create_features(tokens, vocabulary):
    features = np.zeros(len(vocabulary), dtype=int)
    for token in tokens:
        if token in vocabulary:
            features[vocabulary.index(token)] += 1
    return features
def predict(text):
    processed_text = preprocess_text(text)
    features = create_features(processed_text, vocabulary)
    features = np.array(features).reshape(1, -1)
    return model.predict(features)[0]
print(predict("free prize"))`,
    expected: "spam"
  },
  {
    id: "full-pipeline", group: "day3-rebuild", level: "13 · TỰ DỰNG PIPELINE", title: "Từ câu mới đến nhãn spam/ham",
    problem: "Từng khối đã chạy riêng. Giờ nối chúng theo đúng thứ tự để tin mới đi hết pipeline.",
    why: "Model chỉ hiểu vector có vocabulary cố định. Vì thế cần xử lý câu, mã hóa bằng đúng vocabulary, tạo một hàng vector, rồi mới dự đoán.",
    input: "Một số tin nhắn đồ chơi có nhãn ham/spam.", output: "Hàm predict trả về nhãn chữ cho câu mới.",
    steps: [
      ["preprocess_text", "Chuẩn hóa cách viết và tách từ.", "Nếu bỏ, câu mới khác hình thức với dữ liệu train."],
      ["create_dictionary → sorted", "Tạo vocabulary từ dữ liệu học và cố định thứ tự cột.", "Nếu tạo vocabulary khác lúc dự đoán, các số sẽ đổi nghĩa."],
      ["create_features", "Đếm token theo cột vocabulary.", "Nếu đưa chuỗi thô, hàm sẽ đếm ký tự; nếu vector sai độ dài, model báo lỗi."],
      ["fit rồi predict", "Học trên tin nhắn có nhãn rồi dự đoán tin mới.", "Không được dùng đáp án của tin mới để fit nếu muốn đánh giá thật."]
    ],
    starter: `import re
import numpy as np
from sklearn.naive_bayes import MultinomialNB

messages = ["free prize now", "claim free cash", "meeting tomorrow", "project meeting",
            "free cash prize", "lunch meeting", "claim prize now", "project deadline tomorrow"]
labels = ["spam", "spam", "ham", "ham", "spam", "ham", "spam", "ham"]

def preprocess_text(text):
    # TODO: lower + tách các từ bằng re.findall
    return []

def create_dictionary(messages):
    # TODO: tạo set các token từ mọi message
    return set()

def create_features(tokens, vocabulary):
    # TODO: tạo vector đếm theo đúng thứ tự vocabulary
    return np.zeros(len(vocabulary), dtype=int)

token_lists = [preprocess_text(message) for message in messages]
vocabulary = sorted(create_dictionary(token_lists))
X = np.array([create_features(tokens, vocabulary) for tokens in token_lists])
model = MultinomialNB().fit(X, labels)

def predict(text):
    processed_text = preprocess_text(text)
    features = create_features(processed_text, vocabulary).reshape(1, -1)
    return model.predict(features)[0]

print(predict("free prize now"))`,
    challenge: "Hoàn thiện ba hàm TODO. Bấm Chạy để xem lỗi/output; bấm Chạy & kiểm tra để kiểm tra cả nhãn spam và ham.",
    tests: `assert predict("free prize now") == "spam", "Từ free/prize trong ví dụ này là spam"
assert predict("project meeting tomorrow") == "ham", "Từ project/meeting trong ví dụ này là ham"
assert X.shape[0] == len(labels), "Mỗi tin có một hàng đặc trưng"`,
    hint1: "preprocess_text: trả re.findall(r\"[a-z]+\", text.lower()). create_dictionary: lặp messages, add từng token vào set.",
    hint2: "create_features: zeros(len(vocabulary)); với mỗi token, tìm index rồi tăng features[index] lên 1.",
    solution: `import re
import numpy as np
from sklearn.naive_bayes import MultinomialNB
messages = ["free prize now", "claim free cash", "meeting tomorrow", "project meeting", "free cash prize", "lunch meeting", "claim prize now", "project deadline tomorrow"]
labels = ["spam", "spam", "ham", "ham", "spam", "ham", "spam", "ham"]
def preprocess_text(text):
    return re.findall(r"[a-z]+", text.lower())
def create_dictionary(messages):
    dictionary = set()
    for tokens in messages:
        for token in tokens:
            dictionary.add(token)
    return dictionary
def create_features(tokens, vocabulary):
    features = np.zeros(len(vocabulary), dtype=int)
    for token in tokens:
        if token in vocabulary:
            features[vocabulary.index(token)] += 1
    return features
token_lists = [preprocess_text(message) for message in messages]
vocabulary = sorted(create_dictionary(token_lists))
X = np.array([create_features(tokens, vocabulary) for tokens in token_lists])
model = MultinomialNB().fit(X, labels)
def predict(text):
    processed_text = preprocess_text(text)
    features = create_features(processed_text, vocabulary).reshape(1, -1)
    return model.predict(features)[0]
print(predict("free prize now"))`,
    expected: "spam",
    note: "Đây là ví dụ nhỏ để tự viết lại luồng. Nó cố ý không thay thế toàn bộ tiền xử lý/đánh giá của notebook 5.572 tin nhắn."
  },
  {
    id: "manual-cosine-search", group: "day4-retrieval", level: "14 · EMBEDDING VÀ COSINE", title: "Tự xếp hạng vector bằng cosine",
    problem: "Ta có một query vector và ba vector tài liệu đồ chơi. Hãy tính cosine, rồi trả các ID theo điểm giảm dần.",
    why: "Semantic search gồm hai thao tác tách biệt: tạo vector bằng model và xếp hạng vector bằng metric. Bài này tập trung hiểu phần xếp hạng mà không cần tải model.",
    input: "query = [1, 0]; doc d1=[1, 0], d2=[0.8, 0.6], d3=[0, 1].",
    output: "d1 đứng trước d2, d2 đứng trước d3; cosine của d2 bằng 0.800.",
    steps: [
      ["dot(a, b)", "Nhân hai phần tử cùng vị trí rồi cộng lại; đây là tích vô hướng.", "Nếu cộng sai cặp phần tử, góc/vector similarity bị tính sai."],
      ["norm(v)", "Độ dài vector là căn bậc hai của tổng bình phương từng phần tử.", "Nếu bỏ norm, vector dài hơn có thể được điểm cao chỉ vì độ lớn."],
      ["dot / (norm × norm)", "Chuẩn hóa tích vô hướng thành cosine similarity.", "Nếu mẫu số bằng 0, phải trả giá trị an toàn thay vì chia cho 0."],
      ["sorted(..., reverse=True)", "Sắp điểm cao trước và giữ ID đi cùng điểm.", "Nếu sắp riêng mảng ID và điểm, chúng sẽ không còn khớp nhau."]
    ],
    starter: `from math import sqrt

ids = ["d1", "d2", "d3"]
vectors = [[1.0, 0.0], [0.8, 0.6], [0.0, 1.0]]
query = [1.0, 0.0]

def dot(a, b):
    total = 0.0
    for i in range(len(a)):
        # TODO: cộng tích của hai phần tử cùng vị trí
        pass
    return total

def norm(vector):
    # TODO: căn bậc hai của tổng bình phương
    return 0.0

def cosine(a, b):
    denominator = norm(a) * norm(b)
    if denominator == 0:
        return 0.0
    return dot(a, b) / denominator

scored = [(ids[i], cosine(query, vectors[i])) for i in range(len(ids))]
ranking = sorted(scored, key=lambda row: row[1], reverse=True)
for doc_id, score in ranking:
    print(doc_id, round(score, 3))`,
    challenge: "Hoàn thiện dot và norm. Trước khi chạy, xác nhận d2 có dot=0.8 và norm=sqrt(0.8²+0.6²)=1, vì vậy cosine là 0.8.",
    tests: `assert ranking[0][0] == "d1"
assert ranking[1][0] == "d2"
assert round(ranking[1][1], 3) == 0.8
assert ranking[2][0] == "d3"`,
    hint1: "Trong dot, tăng total bằng a[i] * b[i]. Trong norm, cộng v*v cho từng v rồi lấy sqrt.",
    hint2: "Trả total từ dot; trả sqrt(sum(value * value for value in vector)) từ norm.",
    solution: `from math import sqrt
ids = ["d1", "d2", "d3"]
vectors = [[1.0, 0.0], [0.8, 0.6], [0.0, 1.0]]
query = [1.0, 0.0]
def dot(a, b):
    total = 0.0
    for i in range(len(a)):
        total += a[i] * b[i]
    return total
def norm(vector):
    return sqrt(sum(value * value for value in vector))
def cosine(a, b):
    denominator = norm(a) * norm(b)
    return dot(a, b) / denominator if denominator else 0.0
scored = [(ids[i], cosine(query, vectors[i])) for i in range(len(ids))]
ranking = sorted(scored, key=lambda row: row[1], reverse=True)
for doc_id, score in ranking:
    print(doc_id, round(score, 3))`,
    expected: "d1 1.0\nd2 0.8\nd3 0.0",
    note: "Vector được tạo thủ công để luyện metric. Embedding model thật mới biến câu thành vector; lab chỉ mô phỏng bước so sánh."
  },
  {
    id: "mini-vector-store", group: "day5-vectordb", level: "15 · BẢN GHI VÀ FILTER", title: "Mô phỏng collection nhỏ",
    problem: "Lưu đoạn văn cùng ID/vector/metadata, cập nhật bằng upsert, rồi tìm top-k trong một topic.",
    why: "Bản mô phỏng giúp ta hiểu cấu trúc dữ liệu trước khi gọi Chroma. Vector database thật còn lo persistence và index lân cận.",
    input: "Ba bản ghi đồ chơi với vector 2 chiều và metadata topic.",
    output: "Query topic=retrieval trả f1 trước f2; bản ghi topic khác bị loại.",
    steps: [
      ["store[doc_id] = record", "ID là khóa để tìm/cập nhật đúng một bản ghi; record gom document, vector và metadata.", "Nếu chỉ append list, upsert khó tìm và thay đúng ID cũ."],
      ["where topic", "Filter kiểm tra metadata trước khi đưa vector vào ranking.", "Nếu filter sau khi lấy top-k, kết quả đúng ở hạng k+1 có thể bị mất."],
      ["cosine distance", "Chuyển similarity thành distance = 1 - similarity; distance nhỏ hơn thì gần hơn.", "Nếu xếp giảm dần distance, đoạn xa nhất sẽ đứng đầu."],
      ["sorted(... )[:k]", "Chỉ sau filter và tính distance mới lấy k hàng gần nhất.", "Nếu cắt danh sách trước khi sort, top-k không còn đúng."]
    ],
    starter: `from math import sqrt

store = {}

def upsert(doc_id, document, vector, metadata):
    # TODO: ghi một dict gồm document, vector, metadata vào store[doc_id]
    pass

def cosine_distance(a, b):
    dot = sum(x * y for x, y in zip(a, b))
    norm_a = sqrt(sum(x * x for x in a))
    norm_b = sqrt(sum(y * y for y in b))
    if norm_a * norm_b == 0:
        return 1.0
    return 1.0 - dot / (norm_a * norm_b)

def query(query_vector, topic=None, k=2):
    results = []
    for doc_id, record in store.items():
        if topic is not None and record["metadata"].get("topic") != topic:
            continue
        distance = cosine_distance(query_vector, record["vector"])
        results.append((doc_id, distance, record["document"]))
    return sorted(results, key=lambda row: row[1])[:k]

upsert("f1", "Cosine distance nhỏ hơn là gần hơn.", [1.0, 0.0], {"topic": "retrieval"})
upsert("f2", "Embedding biến câu thành vector.", [0.8, 0.6], {"topic": "retrieval"})
upsert("f3", "Naive Bayes phân loại email.", [0.0, 1.0], {"topic": "classification"})
print(query([1.0, 0.0], topic="retrieval"))`,
    challenge: "Hoàn thiện upsert rồi thử query không filter và query có topic=classification. Cập nhật f1 bằng upsert lần nữa; số ID trong store phải vẫn là 3.",
    tests: `assert len(store) == 3, "Upsert cùng ID không được tạo bản ghi mới"
assert query([1.0, 0.0], topic="retrieval")[0][0] == "f1"
assert all(row[0] != "f3" for row in query([1.0, 0.0], topic="retrieval"))`,
    hint1: "upsert chỉ cần gán store[doc_id] bằng một dict có ba key document, vector, metadata.",
    hint2: "Dùng record = {\"document\": document, \"vector\": vector, \"metadata\": metadata} rồi gán vào store[doc_id].",
    solution: `from math import sqrt
store = {}
def upsert(doc_id, document, vector, metadata):
    store[doc_id] = {
        "document": document,
        "vector": vector,
        "metadata": metadata
    }
def cosine_distance(a, b):
    dot = sum(x * y for x, y in zip(a, b))
    norm_a = sqrt(sum(x * x for x in a))
    norm_b = sqrt(sum(y * y for y in b))
    if norm_a * norm_b == 0:
        return 1.0
    return 1.0 - dot / (norm_a * norm_b)
def query(query_vector, topic=None, k=2):
    results = []
    for doc_id, record in store.items():
        if topic is not None and record["metadata"].get("topic") != topic:
            continue
        distance = cosine_distance(query_vector, record["vector"])
        results.append((doc_id, distance, record["document"]))
    return sorted(results, key=lambda row: row[1])[:k]
upsert("f1", "Cosine distance nhỏ hơn là gần hơn.", [1.0, 0.0], {"topic": "retrieval"})
upsert("f2", "Embedding biến câu thành vector.", [0.8, 0.6], {"topic": "retrieval"})
upsert("f3", "Naive Bayes phân loại email.", [0.0, 1.0], {"topic": "classification"})
print(query([1.0, 0.0], topic="retrieval"))`,
    expected: "f1 có distance 0; f2 có distance khoảng 0.2; f3 bị loại khi lọc topic=retrieval.",
    note: "Đây là mô phỏng Python thuần, không ghi xuống đĩa và không có ANN index. Notebook buổi 4 dùng chromadb.PersistentClient thật."
  },
  {
    id: "retrieval-metrics", group: "day6-evaluation", level: "16 · PRECISION RECALL MRR", title: "Tự tính ba metric retrieval",
    problem: "Với ranking [d3, d1, d2, d4] và relevant={d1,d4}, tính P@3, Recall@3 và reciprocal rank.",
    why: "Tự viết metric giúp phân biệt mẫu số của precision/recall và thấy vị trí của kết quả đầu tiên tác động đến MRR ra sao.",
    input: "Ranking có thứ tự; tập relevant là các ID đã gán nhãn đúng.",
    output: "P@3=0.333..., Recall@3=0.5, RR=0.5.",
    steps: [
      ["ranking[:k]", "Chỉ lấy ba kết quả đầu để tính precision/recall@3.", "Nếu lỡ dùng toàn ranking, metric @k không còn giới hạn ở k."],
      ["hits / k", "Precision chia số hit trong top-k cho số slot k.", "Chia cho số tài liệu relevant sẽ ra recall thay vì precision."],
      ["hits / len(relevant)", "Recall chia hit cho tổng đáp án liên quan đã biết.", "Chia cho k sẽ ra precision."],
      ["1 / rank", "Reciprocal rank dùng hạng của hit đầu tiên; không có hit thì bằng 0.", "Dùng rank 0 gây chia cho 0; enumerate nên bắt đầu từ 1."]
    ],
    starter: `ranking = ["d3", "d1", "d2", "d4"]
relevant = {"d1", "d4"}
k = 3

def precision_at_k(ranking, relevant, k):
    # TODO: số relevant trong top-k chia cho k
    return 0.0

def recall_at_k(ranking, relevant, k):
    # TODO: số relevant trong top-k chia cho tổng relevant
    return 0.0

def reciprocal_rank(ranking, relevant):
    # TODO: trả 1/rank của hit đầu tiên, nếu không có thì trả 0
    return 0.0

print(round(precision_at_k(ranking, relevant, k), 3))
print(round(recall_at_k(ranking, relevant, k), 3))
print(round(reciprocal_rank(ranking, relevant), 3))`,
    challenge: "Sửa ranking thành [d3, d2, d4, d1]. Precision@3 và Recall@3 sẽ thế nào? MRR đổi ra sao?",
    tests: `assert round(precision_at_k(ranking, relevant, k), 3) == 0.333
assert round(recall_at_k(ranking, relevant, k), 3) == 0.5
assert round(reciprocal_rank(ranking, relevant), 3) == 0.5
assert reciprocal_rank(["d2", "d3"], {"d1"}) == 0`,
    hint1: "Tạo top_k = ranking[:k]. hits là số doc_id nằm trong relevant.",
    hint2: "RR dùng enumerate(ranking, start=1); gặp relevant thì return 1/rank; hết vòng lặp thì return 0.",
    solution: `ranking = ["d3", "d1", "d2", "d4"]
relevant = {"d1", "d4"}
k = 3
def precision_at_k(ranking, relevant, k):
    top_k = ranking[:k]
    hits = sum(doc_id in relevant for doc_id in top_k)
    return hits / k if k else 0.0
def recall_at_k(ranking, relevant, k):
    if not relevant:
        return 0.0
    top_k = ranking[:k]
    hits = sum(doc_id in relevant for doc_id in top_k)
    return hits / len(relevant)
def reciprocal_rank(ranking, relevant):
    for rank, doc_id in enumerate(ranking, start=1):
        if doc_id in relevant:
            return 1 / rank
    return 0.0
print(round(precision_at_k(ranking, relevant, k), 3))
print(round(recall_at_k(ranking, relevant, k), 3))
print(round(reciprocal_rank(ranking, relevant), 3))`,
    expected: "0.333\n0.5\n0.5"
  },
  {
    id: "rrf-fusion-lab", group: "day6-evaluation", level: "17 · RECIPROCAL RANK FUSION", title: "Hợp nhất hai danh sách bằng RRF",
    problem: "TF-IDF và dense search cho hai ranking khác nhau. Tính điểm RRF và tìm thứ hạng kết hợp.",
    why: "Điểm TF-IDF và cosine không cùng thang. Dùng rank để hợp nhất giúp tránh cộng trực tiếp hai loại điểm.",
    input: "lexical=[d1,d2,d3], dense=[d3,d1,d4].",
    output: "d1 và d3 cùng có thứ hạng cao; với c=60, d1 nhỉnh hơn d3.",
    steps: [
      ["enumerate(ranking, start=1)", "Gán vị trí 1, 2, 3 cho từng ID.", "Rank bắt đầu từ 0 làm thay đổi công thức và tăng điểm quá mức."],
      ["1 / (c + rank)", "Đổi vị trí thành điểm; hạng cao đóng góp lớn hơn.", "Cộng điểm gốc của hai retriever sẽ trộn thang số không tương thích."],
      ["cộng vào scores[id]", "Một ID có mặt ở cả hai danh sách sẽ nhận đóng góp từ cả hai.", "Nếu ghi đè, mất phiếu của hệ thống đầu."],
      ["sort giảm dần", "Xếp ID theo tổng điểm RRF.", "Sắp tăng dần sẽ đưa điểm thấp lên đầu."]
    ],
    starter: `lexical = ["d1", "d2", "d3"]
dense = ["d3", "d1", "d4"]

def rrf(rankings, c=60):
    scores = {}
    for ranking in rankings:
        for rank, doc_id in enumerate(ranking, start=1):
            # TODO: cộng 1/(c+rank) vào điểm hiện tại của doc_id
            pass
    return sorted(scores, key=scores.get, reverse=True), scores

ranking, scores = rrf([lexical, dense])
print(ranking)
print(round(scores["d1"], 5), round(scores["d3"], 5))`,
    challenge: "Đổi c thành 0 rồi quan sát hạng. Sau đó bỏ d1 khỏi dense và xem tài liệu nào được RRF ưu tiên.",
    tests: `assert ranking[0] == "d1"
assert round(scores["d1"], 5) == 0.03252
assert round(scores["d3"], 5) == 0.03227
assert set(ranking) == {"d1", "d2", "d3", "d4"}`,
    hint1: "Ở mỗi vòng, scores[doc_id] bằng điểm cũ cộng 1/(c+rank). Dùng scores.get(doc_id, 0.0).",
    hint2: "scores[doc_id] = scores.get(doc_id, 0.0) + 1.0 / (c + rank)",
    solution: `lexical = ["d1", "d2", "d3"]
dense = ["d3", "d1", "d4"]
def rrf(rankings, c=60):
    scores = {}
    for ranking in rankings:
        for rank, doc_id in enumerate(ranking, start=1):
            scores[doc_id] = scores.get(doc_id, 0.0) + 1.0 / (c + rank)
    return sorted(scores, key=scores.get, reverse=True), scores
ranking, scores = rrf([lexical, dense])
print(ranking)
print(round(scores["d1"], 5), round(scores["d3"], 5))`,
    expected: "d1 đứng đầu; score d1≈0.03252, score d3≈0.03227."
  },
  {
    id: "tfidf-preprocess", group: "day4-foundations", level: "BUỔI 3 · TỪ CÂU ĐẾN CORPUS", title: "Chuẩn hóa câu và gom vocabulary",
    problem: "Trước khi đếm TF, mọi câu phải được tách từ và dùng chung một danh sách cột.",
    why: "Nếu mỗi câu tự tạo cột riêng, con số ở cùng vị trí có thể chỉ các từ khác nhau. Vocabulary chung giữ nghĩa của vector ổn định.",
    input: "Hai câu tiếng Việt ngắn.", output: "List từ đã chuẩn hóa và vocabulary không trùng, được sắp xếp.",
    steps: [
      ["text.lower()", "Đưa chữ hoa về chữ thường để cùng một từ không bị xem thành hai từ.", "Nếu bỏ qua, Mèo và mèo có thể thành hai cột."],
      ["text.split()", "Tách chuỗi tại khoảng trắng thành list từ.", "Không tách thì không thể đếm riêng từng từ."],
      ["set.add(word)", "Thêm từ vào vùng chứa không cho phép bản trùng.", "Dùng list thường sẽ có cột lặp lại."],
      ["sorted(vocabulary_set)", "Cố định thứ tự cột để các vector có thể so sánh.", "Thứ tự không ổn định làm sai nghĩa từng vị trí."]
    ],
    starter: ["docs = ['Mèo ăn cá', 'Chó ăn cá']", "", "def preprocess(text):", "    # TODO: chữ thường rồi tách khoảng trắng", "    pass", "", "def create_corpus(docs):", "    processed_docs = []", "    vocabulary_set = set()", "    for text in docs:", "        words = preprocess(text)", "        processed_docs.append(words)", "        for word in words:", "            vocabulary_set.add(word)", "    return processed_docs, sorted(vocabulary_set)", "", "processed_docs, vocabulary = create_corpus(docs)", "print(processed_docs)", "print(vocabulary)"].join("\n"),
    challenge: "Thêm câu thứ ba có từ mới. Đoán vocabulary trước khi chạy rồi so lại.",
    tests: "assert processed_docs[0] == [\"mèo\", \"ăn\", \"cá\"]\nassert vocabulary == [\"ăn\", \"cá\", \"chó\", \"mèo\"]",
    hint1: "Hàm preprocess cần trả về kết quả của text.lower().split().",
    hint2: "Trong preprocess, tạo biến words = text.lower().split() rồi return words.",
    solution: ["docs = ['Mèo ăn cá', 'Chó ăn cá']", "def preprocess(text):", "    return text.lower().split()", "def create_corpus(docs):", "    processed_docs = []", "    vocabulary_set = set()", "    for text in docs:", "        words = preprocess(text)", "        processed_docs.append(words)", "        for word in words:", "            vocabulary_set.add(word)", "    return processed_docs, sorted(vocabulary_set)", "processed_docs, vocabulary = create_corpus(docs)", "print(processed_docs)", "print(vocabulary)"].join("\n"),
    expected: "Vocabulary: ['ăn', 'cá', 'chó', 'mèo']."
  },
  {
    id: "tf-count", group: "day4-tf", level: "BUỔI 3 · TERM FREQUENCY", title: "Đổi số đếm thành tỷ lệ TF",
    problem: "Một vector TF cần một ô cho mỗi từ trong vocabulary, kể cả từ không xuất hiện.",
    why: "TF chuẩn hóa tần suất theo độ dài tài liệu; vector có cùng thứ tự cột để ngày mai nhân với IDF.",
    input: "Một list từ và vocabulary đã sắp xếp.", output: "Với mèo ăn cá mèo, TF là [0.25, 0.25, 0.0, 0.5].",
    steps: [
      ["word_count.get(word, 0) + 1", "Đếm số lần xuất hiện; get bắt đầu từ 0 cho từ mới.", "Nếu chỉ gán bằng 1 thì từ lặp bị đếm thiếu."],
      ["len(word_list)", "Tổng số từ là mẫu số để đổi số đếm thành tỷ lệ.", "Bỏ mẫu số sẽ trả số đếm thô thay vì TF."],
      ["for word in vocabulary", "Tạo số theo đúng thứ tự cột chung.", "Đi theo thứ tự câu làm lệch cột giữa tài liệu."],
      ["if total_words == 0", "Tài liệu rỗng cần tránh phép chia cho 0.", "Chia cho 0 gây lỗi hoặc giá trị không hợp lệ."]
    ],
    starter: ["import numpy as np", "word_list = ['mèo', 'ăn', 'cá', 'mèo']", "vocabulary = ['ăn', 'cá', 'chó', 'mèo']", "", "def compute_tf(word_list, vocabulary):", "    word_count = {}", "    for word in word_list:", "        # TODO: tăng bộ đếm", "        pass", "    total_words = len(word_list)", "    tf_vector = []", "    for word in vocabulary:", "        count = word_count.get(word, 0)", "        # TODO: thêm count / total_words; nếu rỗng thì thêm 0", "        pass", "    return np.array(tf_vector)", "", "print(compute_tf(word_list, vocabulary))"].join("\n"),
    challenge: "Thử list rỗng và xác nhận vector có bốn số 0, không báo chia cho 0.",
    tests: "vector = compute_tf(word_list, vocabulary)\nassert np.allclose(vector, [0.25, 0.25, 0.0, 0.5])\nassert np.allclose(compute_tf([], vocabulary), [0, 0, 0, 0])",
    hint1: "Dùng word_count.get(word, 0) + 1 khi gặp mỗi từ.",
    hint2: "Trong vòng vocabulary, thêm count / total_words nếu total_words khác 0; nếu không thêm 0.",
    solution: ["import numpy as np", "word_list = ['mèo', 'ăn', 'cá', 'mèo']", "vocabulary = ['ăn', 'cá', 'chó', 'mèo']", "def compute_tf(word_list, vocabulary):", "    word_count = {}", "    for word in word_list:", "        word_count[word] = word_count.get(word, 0) + 1", "    total_words = len(word_list)", "    tf_vector = []", "    for word in vocabulary:", "        count = word_count.get(word, 0)", "        tf_vector.append(count / total_words if total_words else 0)", "    return np.array(tf_vector)", "print(compute_tf(word_list, vocabulary))"].join("\n"),
    expected: "[0.25 0.25 0.   0.5 ]"
  },
  {
    id: "smoothed-idf", group: "day5-idf", level: "BUỔI 4 · INVERSE DOCUMENT FREQUENCY", title: "Đếm tài liệu có từ và tính IDF",
    problem: "Từ có ở mọi tài liệu ít giúp phân biệt; từ hiếm hữu ích hơn.",
    why: "IDF nhìn toàn corpus. Ta đếm số tài liệu chứa từ, không đếm số lần lặp trong một tài liệu.",
    input: "Ba tài liệu token hóa và vocabulary chung.", output: "Từ có df=1 nhận IDF cao hơn từ có df=3.",
    steps: [
      ["num_docs = len(processed_docs)", "N là số tài liệu trong corpus.", "Dùng số từ thay N sẽ làm sai công thức."],
      ["if word in doc", "Mỗi tài liệu chỉ đóng góp tối đa một vào document frequency.", "Đếm mọi lần lặp sẽ phóng đại df."],
      ["np.log((N+1)/(df+1))+1", "Công thức làm trơn được dùng trong notebook gốc.", "Bỏ phần cộng 1 có thể tạo phép chia cho 0."],
      ["np.array(idf_values)", "Trả vector IDF theo đúng thứ tự vocabulary.", "Thứ tự khác sẽ nhân trọng số vào cột sai."]
    ],
    starter: ["import numpy as np", "processed_docs = [['mèo', 'ăn', 'mèo'], ['chó', 'ăn'], ['cá', 'ăn']]", "vocabulary = ['ăn', 'cá', 'chó', 'mèo']", "", "def compute_idf(processed_docs, vocabulary):", "    num_docs = len(processed_docs)", "    idf_values = []", "    for word in vocabulary:", "        document_frequency = 0", "        for doc in processed_docs:", "            # TODO: tăng df nếu tài liệu có từ này", "            pass", "        idf = np.log((num_docs + 1) / (document_frequency + 1)) + 1", "        idf_values.append(idf)", "    return np.array(idf_values)", "", "print(np.round(compute_idf(processed_docs, vocabulary), 3))"].join("\n"),
    challenge: "Từ ăn xuất hiện ba tài liệu nhưng lặp không được tính thêm trong cùng tài liệu. So IDF của ăn và mèo.",
    tests: "idf = compute_idf(processed_docs, vocabulary)\nassert np.isclose(idf[0], 1.0)\nassert idf[3] > idf[0]",
    hint1: "Trong vòng lặp từng doc, kiểm tra điều kiện word in doc.",
    hint2: "Nếu word in doc đúng, document_frequency += 1.",
    solution: ["import numpy as np", "processed_docs = [['mèo', 'ăn', 'mèo'], ['chó', 'ăn'], ['cá', 'ăn']]", "vocabulary = ['ăn', 'cá', 'chó', 'mèo']", "def compute_idf(processed_docs, vocabulary):", "    num_docs = len(processed_docs)", "    idf_values = []", "    for word in vocabulary:", "        document_frequency = 0", "        for doc in processed_docs:", "            if word in doc:", "                document_frequency += 1", "        idf = np.log((num_docs + 1) / (document_frequency + 1)) + 1", "        idf_values.append(idf)", "    return np.array(idf_values)", "print(np.round(compute_idf(processed_docs, vocabulary), 3))"].join("\n"),
    expected: "Từ ăn có IDF 1.0; từ mèo có IDF lớn hơn."
  },
  {
    id: "cosine-vectors", group: "day5-cosine", level: "BUỔI 4 · COSINE", title: "So hướng hai vector",
    problem: "Ta cần điểm tương đồng không tự tăng chỉ vì một vector dài hơn.",
    why: "Cosine chia tích vô hướng cho độ dài hai vector. Trước khi chia, phải xử lý vector toàn 0.",
    input: "Hai cặp vector số.", output: "Cùng hướng cho 1; vuông góc cho 0.",
    steps: [
      ["np.dot(a, b)", "Nhân từng vị trí rồi cộng thành tích vô hướng.", "So từng con số riêng sẽ không cho một điểm chung."],
      ["np.linalg.norm(a)", "Tính độ dài vector.", "Không chuẩn hóa khiến vector dài tự có tích lớn."],
      ["norm == 0", "Vector 0 không có hướng và không thể chia.", "Bỏ nhánh này dẫn đến phép chia cho 0."],
      ["dot / (norm_a * norm_b)", "Chuẩn hóa tích vô hướng thành cosine.", "Đảo tử/mẫu cho ra công thức sai."]
    ],
    starter: ["import numpy as np", "def cosine_similarity(vec_a, vec_b):", "    # TODO: tính tích vô hướng và hai độ dài", "    dot_product = 0", "    norm_a = 0", "    norm_b = 0", "    # TODO: nếu một độ dài bằng 0, trả 0.0", "    return 0.0", "", "print(cosine_similarity(np.array([1, 0]), np.array([1, 0])))", "print(cosine_similarity(np.array([1, 0]), np.array([0, 1])))"],
    challenge: "Thử thêm vector [0, 0]. Hàm phải trả 0.0 và không báo lỗi.",
    tests: "assert np.isclose(cosine_similarity(np.array([1, 0]), np.array([1, 0])), 1.0)\nassert np.isclose(cosine_similarity(np.array([1, 0]), np.array([0, 1])), 0.0)\nassert cosine_similarity(np.array([0, 0]), np.array([1, 0])) == 0.0",
    hint1: "Tính độ dài bằng np.linalg.norm(vec_a), còn tích vô hướng bằng np.dot(vec_a, vec_b).",
    hint2: "Nếu norm_a == 0 or norm_b == 0 thì return 0.0; nếu không return dot_product / (norm_a * norm_b).",
    solution: ["import numpy as np", "def cosine_similarity(vec_a, vec_b):", "    dot_product = np.dot(vec_a, vec_b)", "    norm_a = np.linalg.norm(vec_a)", "    norm_b = np.linalg.norm(vec_b)", "    if norm_a == 0 or norm_b == 0:", "        return 0.0", "    return dot_product / (norm_a * norm_b)", "print(cosine_similarity(np.array([1, 0]), np.array([1, 0])))", "print(cosine_similarity(np.array([1, 0]), np.array([0, 1])))"],
    expected: "1.0 rồi 0.0"
  },
  {
    id: "pairwise-similarity", group: "day5-plagiarism", level: "BUỔI 4 · MA TRẬN ĐẠO VĂN", title: "Lưu điểm của tất cả cặp",
    problem: "Với N tài liệu, cần xem điểm của từng cặp trong ma trận N×N.",
    why: "Vòng lặp lồng nhau chọn tài liệu hàng và cột. Ma trận đối xứng, đường chéo so tài liệu với chính nó.",
    input: "Ba vector TF-IDF nhỏ.", output: "Ma trận 3×3 đối xứng với đường chéo bằng 1.",
    steps: [
      ["np.zeros((n, n))", "Tạo sẵn chỗ chứa điểm cho mọi cặp.", "Thiếu một chiều sẽ không lưu được hàng và cột."],
      ["for i ... for j ...", "Xét lần lượt từng cặp có thứ tự.", "Chỉ chạy một vòng thì nhiều ô không được điền."],
      ["matrix[i, j] = cosine(...)", "Ghi điểm vào ô đúng hàng/cột.", "Ghi nhầm i và j làm lẫn cặp tài liệu."],
      ["heatmap(..., annot=True)", "Hiển thị cả màu lẫn con số.", "Chỉ nhìn màu khó biết giá trị cụ thể."]
    ],
    starter: ["import numpy as np", "vectors = np.array([[1.0, 0.0], [1.0, 0.0], [0.0, 1.0]])", "", "def cosine_similarity(a, b):", "    denominator = np.linalg.norm(a) * np.linalg.norm(b)", "    return float(np.dot(a, b) / denominator) if denominator else 0.0", "", "n = len(vectors)", "similarity_matrix = np.zeros((n, n))", "for i in range(n):", "    for j in range(n):", "        # TODO: ghi cosine của vectors[i] và vectors[j]", "        pass", "", "print(similarity_matrix)"],
    challenge: "Vẽ ma trận bằng seaborn. Thêm nhãn tài liệu 0, 1, 2 và đọc ô [0, 2].",
    tests: "assert similarity_matrix.shape == (3, 3)\nassert np.allclose(similarity_matrix, similarity_matrix.T)\nassert np.allclose(np.diag(similarity_matrix), [1, 1, 1])",
    hint1: "Trong vòng lặp, gán vào similarity_matrix[i, j].",
    hint2: "Dòng cần điền là similarity_matrix[i, j] = cosine_similarity(vectors[i], vectors[j]).",
    solution: ["import numpy as np", "vectors = np.array([[1.0, 0.0], [1.0, 0.0], [0.0, 1.0]])", "def cosine_similarity(a, b):", "    denominator = np.linalg.norm(a) * np.linalg.norm(b)", "    return float(np.dot(a, b) / denominator) if denominator else 0.0", "n = len(vectors)", "similarity_matrix = np.zeros((n, n))", "for i in range(n):", "    for j in range(n):", "        similarity_matrix[i, j] = cosine_similarity(vectors[i], vectors[j])", "print(similarity_matrix)"],
    expected: "Shape (3, 3); hai tài liệu giống vector có điểm 1; ma trận đối xứng."
  },
  {
    id: "fit-query-topk", group: "day6-retrieval", level: "BUỔI 5 · TEXT RETRIEVAL", title: "Fit tài liệu, tìm top-k câu",
    problem: "Tìm các đoạn văn gần với câu hỏi và trả lại cả ID, điểm, nội dung.",
    why: "Tài liệu và query phải dùng chung vectorizer để các cột vector có cùng nghĩa.",
    input: "Ba đoạn text và một câu hỏi.", output: "Các ID có cosine cao nhất đứng trước.",
    steps: [
      ["fit_transform(context)", "Học vocabulary/IDF từ tài liệu và tạo ma trận tài liệu.", "Fit riêng từng câu làm không gian cột khác nhau."],
      ["transform([question])", "Mã hóa query theo các cột đã học.", "Dùng fit_transform cho query sẽ học vocabulary khác."],
      ["cosine_similarity(...).ravel()", "So một query với mọi tài liệu, rồi làm phẳng điểm.", "Bỏ ravel thì kết quả vẫn có thêm một chiều."],
      ["argsort(scores)[::-1][:k]", "Lấy chỉ số k điểm cao nhất trước.", "Quên đảo chiều sẽ lấy điểm thấp trước."]
    ],
    starter: ["import numpy as np", "from sklearn.feature_extraction.text import TfidfVectorizer", "from sklearn.metrics.pairwise import cosine_similarity", "context = ['tf idf weighs common words', 'cosine compares vector direction', 'python functions group steps']", "vectorizer = TfidfVectorizer()", "doc_matrix = vectorizer.fit_transform(context)", "question = 'cosine compares vectors'", "# TODO: transform query; tính scores; xếp top 2", "print(scores)", "print(top_ids)"],
    challenge: "Đổi câu hỏi thành một câu không có từ nào trong context. Quan sát điểm và giải thích vì sao top-k không chắc là câu trả lời.",
    tests: "assert len(top_ids) == 2\nassert int(top_ids[0]) == 1\nassert scores.shape == (3,)",
    hint1: "Tạo query_vector bằng vectorizer.transform([question]); sau đó cosine_similarity(query_vector, doc_matrix).ravel().",
    hint2: "top_ids = np.argsort(scores)[::-1][:2]",
    solution: ["import numpy as np", "from sklearn.feature_extraction.text import TfidfVectorizer", "from sklearn.metrics.pairwise import cosine_similarity", "context = ['tf idf weighs common words', 'cosine compares vector direction', 'python functions group steps']", "vectorizer = TfidfVectorizer()", "doc_matrix = vectorizer.fit_transform(context)", "question = 'cosine compares vectors'", "query_vector = vectorizer.transform([question])", "scores = cosine_similarity(query_vector, doc_matrix).ravel()", "top_ids = np.argsort(scores)[::-1][:2]", "print(scores)", "print(top_ids)"],
    expected: "ID 1 đứng đầu vì tài liệu đó nói về cosine và vector."
  }
];
