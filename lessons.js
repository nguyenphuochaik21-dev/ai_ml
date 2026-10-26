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
  }
];
