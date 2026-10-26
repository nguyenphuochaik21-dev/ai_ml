(() => {
  const slides = [
    {
      chapter: 0, day: 'BẢN ĐỒ 3 NGÀY', title: 'Từ câu chữ đến nhãn dự đoán',
      lede: 'Mục tiêu không phải học thuộc thư viện. Mục tiêu là nhìn một dòng code và trả lời: dữ liệu gì đi vào, dòng này biến đổi gì, vì sao cần nó, kết quả đi tiếp đâu?',
      flow: ['Câu chữ', 'Làm sạch', 'Từ vựng', 'Vector số', 'Mô hình', 'Nhãn'],
      steps: [
        'Ngày 1 · Nền móng|Tập đọc biến, list, vòng lặp, điều kiện và hàm; sau đó dùng chúng để xử lý câu và đếm dấu hiệu cảm xúc.',
        'Ngày 2 · Biểu diễn|Biến CSV thành tin nhắn đã làm sạch, vocabulary, vector BoW và các tập train/test.',
        'Ngày 3 · Dự đoán|Huấn luyện Naive Bayes, đo kết quả, lần theo kiểu dữ liệu rồi tự ráp pipeline.'
      ],
      why: 'Mỗi bước giải quyết một vấn đề cụ thể. Nếu biết hình dạng dữ liệu trước và sau bước đó, ta có thể tự dựng lại luồng mà không cần nhớ máy móc.',
      question: 'Khi nhìn một dòng code lạ, ba câu hỏi đầu tiên nên là gì?',
      answer: 'Dữ liệu đầu vào đang có kiểu gì? Dòng này biến đổi dữ liệu ra sao? Kết quả sẽ được bước tiếp theo dùng thế nào?'
    },
    {
      chapter: 0, day: 'CÁCH TƯ DUY', title: 'Đọc code như lần theo đường đi của dữ liệu',
      lede: 'Đừng bắt đầu bằng “dòng này nghĩa là gì?”. Hãy bắt đầu bằng “ta đang có gì và muốn biến nó thành gì?”.',
      flow: ['Input', 'Thao tác', 'Output', 'Bước kế'],
      steps: [
        '1 · Gọi tên dữ liệu|Một câu thường là str; danh sách từ là list[str]; vector là list[int] hoặc mảng số.',
        '2 · Nói động từ của dòng code|lower đổi chữ thường, split tách chuỗi, append thêm phần tử, fit học từ dữ liệu.',
        '3 · Kiểm tra kết quả|Dự đoán output bằng tay trên ví dụ nhỏ trước khi chạy. Nếu sai, so với output thật.'
      ],
      code: 'text = "Win a free prize!"\nwords = text.lower().split()\nprint(words)',
      input: 'str: "Win a free prize!"', output: 'list[str]: ["win", "a", "free", "prize!"]',
      why: 'Viết đúng cú pháp chỉ là bước đầu. Mô tả được kiểu dữ liệu trước và sau mới cho thấy ta hiểu dòng code.',
      question: 'Nếu bỏ lower(), Python có xem Free và free là cùng một từ không?',
      answer: 'Không. Chuỗi phân biệt hoa/thường. lower() chuẩn hóa cả hai thành free để bước đếm không bỏ sót.'
    },
    {
      chapter: 1, day: 'PYTHON CĂN BẢN', title: 'Biến là chiếc nhãn gắn vào một giá trị',
      lede: 'Python không cần khai báo kiểu biến trước. Giá trị đang nằm trong biến quyết định thao tác nào phù hợp.',
      flow: ['name: str', 'tokens: list[str]', 'count: int'],
      steps: [
        'Gán bằng dấu =|name = "An" làm tên name tham chiếu tới một chuỗi ký tự.',
        'Kiểm tra kiểu và độ dài|type(name) cho biết kiểu; len(name) đếm ký tự hoặc số phần tử trong list.',
        'Đổi kiểu khi cần|int("3") đổi chuỗi "3" thành số nguyên 3. Chuỗi và số không tự cộng được với nhau.'
      ],
      code: 'name = "An"\ntokens = ["good", "film"]\ncount = len(tokens)\nprint(count)',
      input: 'Chuỗi name và danh sách tokens', output: '2 · có hai từ trong list',
      why: 'NameError thường do chưa tạo biến; TypeError thường do sai kiểu. Gọi tên kiểu dữ liệu giúp tìm lỗi nhanh hơn.',
      question: 'tokens + "!" có nghĩa là thêm dấu ! vào từng từ không?',
      answer: 'Không. tokens là list còn "!" là str; kiểu không tương thích. Ta cần viết rõ muốn ghép chuỗi nào hoặc thêm phần tử nào.'
    },
    {
      chapter: 1, day: 'PYTHON CĂN BẢN', title: 'List giữ thứ tự; vòng lặp xử lý từng từ',
      lede: 'List lưu nhiều phần tử. Python đếm index từ 0; for lần lượt đưa từng phần tử vào biến vòng lặp.',
      flow: ['words[0]', 'words[1]', 'words[2]'],
      steps: [
        'Truy cập index|words[0] là từ đầu tiên; words[2] là từ thứ ba. words[3] lỗi nếu list chỉ có ba từ.',
        'for lấy từng phần tử|Ở mỗi lượt, word nhận một phần tử của words; thân vòng lặp xử lý phần tử hiện tại.',
        'Thụt lề quyết định phạm vi|Lệnh thụt vào chạy bên trong vòng lặp; lệnh không thụt vào chạy sau khi lặp xong.'
      ],
      code: 'words = ["free", "win", "free"]\ncount = 0\nfor word in words:\n    if word == "free":\n        count += 1\nprint(count)',
      input: 'list[str] có free hai lần', output: '2',
      why: 'Vòng lặp dùng cùng một thao tác cho list dài ngắn bất kỳ. Theo dõi word và count ở từng lượt giúp tìm lỗi đếm.',
      question: 'Nếu chuyển count += 1 ra ngoài if, kết quả sẽ là mấy?',
      answer: '3, vì biến đếm tăng một lần cho mọi từ chứ không chỉ từ free.'
    },
    {
      chapter: 1, day: 'PYTHON CĂN BẢN', title: 'if chọn nhánh; hàm đóng gói một việc có tên',
      lede: 'Điều kiện trả lời “nếu điều này đúng thì làm gì?”. Hàm gom các bước để gọi lại bằng một tên.',
      flow: ['đầu vào', 'if / else', 'return kết quả'],
      steps: [
        'if so sánh giá trị|== hỏi hai giá trị có bằng nhau; > so sánh độ lớn. Điều kiện cho ra True hoặc False.',
        'def tạo hàm|Tham số là dữ liệu hàm nhận; return gửi kết quả ra ngoài để code khác dùng.',
        'import lấy công cụ|import re nạp biểu thức chính quy; re.sub có thể thay ký tự theo mẫu.'
      ],
      code: 'def label_score(score):\n    if score > 0:\n        return "positive"\n    return "neutral"\n\nprint(label_score(2))',
      input: 'score: int = 2', output: 'str: positive',
      why: 'Tách mỗi chức năng thành hàm giúp kiểm tra từng phần và tái sử dụng cách xử lý cho nhiều câu.',
      question: 'Nếu bỏ return mà chỉ print("positive"), hàm trả về gì?',
      answer: 'None. Hàm đã in chữ ra màn hình, nhưng chưa trả kết quả để code khác dùng.'
    },
    {
      chapter: 1, day: 'NGÀY 1 · CẢM XÚC', title: 'Bài toán cảm xúc bắt đầu bằng một quy tắc',
      lede: 'Notebook đầu tiên chưa dùng mô hình học máy. Code đếm từ trong danh sách tích cực và tiêu cực rồi so sánh hai điểm.',
      flow: ['Review', 'Tokenize', 'Chuẩn hóa', 'Đếm dấu hiệu', 'Nhãn'],
      steps: [
        'Nguyên liệu|Review là str; danh sách positive/negative là những từ khóa người viết chọn trước.',
        'Biến đổi|Tách câu, bỏ một số từ phổ biến, rút dạng từ để so khớp các từ gần nhau.',
        'Quyết định|Điểm tích cực cao hơn thì trả nhãn tích cực; điểm thấp hơn thì tiêu cực; bằng nhau thì trung tính.'
      ],
      input: '"The film was good, not terrible"', output: 'Token đã xử lý → hai điểm số → nhãn',
      why: 'Đây là quy tắc dễ nhìn và sửa được, nhưng nó không hiểu phủ định, mỉa mai hay ngữ cảnh như con người.',
      question: 'Câu “not good” có từ good. Bộ đếm chắc chắn hiểu câu đang chê không?',
      answer: 'Không. Bộ đếm có thể cho điểm tích cực vì nó không hiểu quan hệ phủ định giữa not và good.'
    },
    {
      chapter: 1, day: 'NGÀY 1 · TIỀN XỬ LÝ', title: 'Tokenization đổi một chuỗi thành danh sách từ',
      lede: 'Máy tính nhận câu là một chuỗi. Ta tách thành token để có thể lọc, chuẩn hóa và đếm từng đơn vị.',
      flow: ['"Win a free prize!"', 'lowercase', 'tách từ', 'list[str]'],
      steps: [
        'Bắt đầu ở dạng str|Câu ban đầu là một chuỗi; chưa thể tiện lặp riêng từng từ.',
        'Chuẩn hóa chữ hoa|lower() đổi Win thành win để khác biệt hoa/thường không tạo từ mới.',
        'Tách câu|split() minh họa việc cắt theo khoảng trắng. Tokenizer thật xử lý dấu câu/ngôn ngữ tốt hơn.'
      ],
      code: 'text = "Win a free prize!"\ntokens = text.lower().replace("!", "").split()\nprint(tokens)',
      input: 'str', output: 'list[str]: ["win", "a", "free", "prize"]',
      why: 'Notebook dùng spaCy/NLTK. Bài thực hành đơn giản hơn để ta thấy kiểu dữ liệu đổi từ str sang list.',
      question: 'split() có tự xóa dấu phẩy hay dấu chấm không?',
      answer: 'Không. split chỉ tách khoảng trắng. Ta cần tokenizer hoặc một bước làm sạch dấu câu.'
    },
    {
      chapter: 1, day: 'NGÀY 1 · CHUẨN HÓA TỪ', title: 'Stop words, stemming và lemmatization khác nhau',
      lede: 'Cả ba cùng thay đổi token nhưng có mục đích khác nhau. Hãy so kết quả sau từng bước.',
      flow: ['"The movies were amazing"', 'bỏ the, were', 'rút dạng từ', 'token đã chuẩn hóa'],
      steps: [
        'Stop words|Bỏ một số từ rất thường gặp như the hoặc were nếu chúng ít giúp phân biệt lớp.',
        'Stemming|Cắt đuôi theo quy tắc; movies có thể thành movi, amazing có thể thành amaz.',
        'Lemmatization|Dùng từ điển/ngữ cảnh để tìm dạng gốc; kết quả có thể là movie và amazing.'
      ],
      code: 'stemmed = ["movi", "amaz"]\nlemmatized = ["movie", "amazing"]',
      input: 'list[str] token sau tokenize', output: 'list[str] đã lọc và chuẩn hóa',
      why: 'Từ điển phải dùng cùng dạng với token. Tìm amaz trong từ điển chỉ lưu amazing sẽ không khớp.',
      question: 'Có thể fit vocabulary bằng lemma rồi xử lý email mới bằng stemmer không?',
      answer: 'Không nên. Hai bên dễ tạo token khác nhau; dùng cùng một bộ tiền xử lý ở cả train và dự đoán.'
    },
    {
      chapter: 1, day: 'NGÀY 1 · QUY TẮC SENTIMENT', title: 'Đếm hai nhóm từ rồi so sánh',
      lede: 'Hàm sentiment là thuật toán quy tắc: danh sách từ và nhánh if do người viết định nghĩa, không phải model được huấn luyện.',
      flow: ['tokens', 'pos_count', 'neg_count', 'so sánh', 'nhãn'],
      steps: [
        'Khởi tạo bộ đếm|pos_count = 0 và neg_count = 0 là hai số nguyên bắt đầu từ chưa thấy dấu hiệu.',
        'Tăng đúng bộ đếm|Token thuộc từ điển tích cực thì tăng pos_count; từ tiêu cực thì tăng neg_count.',
        'Trả về nhãn|if/elif/else xử lý trường hợp điểm tích cực cao hơn, tiêu cực cao hơn hoặc bằng nhau.'
      ],
      code: 'if pos_count > neg_count:\n    label = "positive"\nelif neg_count > pos_count:\n    label = "negative"\nelse:\n    label = "neutral"',
      input: 'pos_count = 2, neg_count = 1', output: 'label = "positive"',
      why: 'Tách bước đếm khỏi quyết định giúp ta in token và hai bộ đếm để tìm nơi quy tắc cho kết quả bất ngờ.',
      question: 'Nếu cả hai bộ đếm bằng 0, nhánh nào chạy?',
      answer: 'Nhánh else; theo quy tắc này nhãn là neutral.'
    },
    {
      chapter: 1, day: 'NGÀY 1 · SỬA NOTEBOOK', title: 'Code, comment và output có thể không khớp nhau',
      lede: 'Notebook có ví dụ “better than the previous one” với comment nói tích cực nhưng output đã lưu là trung tính.',
      flow: ['review đầu vào', 'token sau xử lý', 'từ điển', 'đếm lại', 'output mới'],
      steps: [
        'Trace token thật|better có bị stem hay đổi lemma? Sau xử lý biến thành dạng nào?',
        'Kiểm tra từ điển|Token đầu ra có đúng bằng một phần tử trong positive_words không?',
        'Chạy lại tuần tự|Output lưu có thể đến từ lần chạy cũ. Chạy lại cell từ đầu để kiểm tra code hiện tại.'
      ],
      input: '"better than the previous one"', output: 'Kết quả phụ thuộc token và từ điển đang dùng',
      why: 'Comment là lời giải thích; output là lịch sử chạy. In dữ liệu trung gian để xác minh cả hai.',
      question: 'Muốn tìm nguyên nhân nhanh, nên in gì trước khi xem nhãn?',
      answer: 'In tokens sau tiền xử lý, các từ khóa có liên quan và hai biến đếm.'
    },
    {
      chapter: 2, day: 'NGÀY 2 · CSV & NHÃN', title: 'CSV là bảng; X và y phải khớp từng hàng',
      lede: 'Notebook đọc CSV thành DataFrame rồi lấy Message và Category. Mỗi hàng là một email có đáp án.',
      flow: ['CSV row', 'Message: str', 'Category: ham/spam', 'X, y'],
      steps: [
        'pd.read_csv|Đọc dữ liệu thành bảng pandas; mỗi hàng mô tả một email.',
        'Tách đầu vào và đáp án|X giữ nội dung tin nhắn; y giữ nhãn tương ứng cùng thứ tự hàng.',
        'Mã hóa nhãn|LabelEncoder đổi nhãn chữ sang số; giữ encoder để đổi số dự đoán về ham/spam.'
      ],
      code: 'X = df["Message"].tolist()\ny_text = df["Category"].tolist()\ny = label_encoder.fit_transform(y_text)',
      input: 'Bảng có cột Message và Category', output: 'X: list[str] · y: các mã số nhãn',
      why: 'Nếu X bị xáo thứ tự mà y không xáo theo, email sẽ ghép nhầm đáp án. X[i] phải đi cùng y[i].',
      question: 'Vì sao cần giữ label_encoder sau fit_transform?',
      answer: 'Để dùng inverse_transform đổi mã số dự đoán trở lại ham hoặc spam.'
    },
    {
      chapter: 2, day: 'NGÀY 2 · TIỀN XỬ LÝ SPAM', title: 'Làm sạch từng tin nhắn theo cùng một thứ tự',
      lede: 'Mục tiêu là tạo list token ổn định để một từ không bị đếm thành nhiều cách viết khác nhau.',
      flow: ['str gốc', 'lower + bỏ dấu', 'tokenize', 'lọc stop words', 'stemming'],
      steps: [
        'Chuẩn hóa|Đổi chữ thường và bỏ dấu câu/ký tự không cần thiết theo quy tắc của bài.',
        'Tokenize rồi lọc|Đổi chuỗi thành list từ, sau đó bỏ từ nằm trong tập stop words.',
        'Stem và trả kết quả|Hàm trả list[str] đã xử lý; không trả lại câu gốc.'
      ],
      code: 'def preprocess_text(text):\n    text = text.lower()\n    tokens = text.split()\n    tokens = [w for w in tokens if w not in stop_words]\n    return [stemmer.stem(w) for w in tokens]',
      input: 'str: "WIN a free prize now"', output: 'list[str], ví dụ: ["win", "free", "prize"]',
      why: 'Hàm dự đoán phải gọi đúng cách tiền xử lý đã dùng khi chuẩn bị dữ liệu; nếu không token sẽ không khớp vocabulary.',
      question: 'Hàm preprocess_text trả str hay list[str]?',
      answer: 'list[str], vì return trả danh sách token đã xử lý.'
    },
    {
      chapter: 2, day: 'NGÀY 2 · VOCABULARY', title: 'List comprehension tạo danh sách; set loại trùng',
      lede: 'Một biểu thức có thể gọi hàm cho từng tin nhắn. Set gom các từ khác nhau thành vocabulary.',
      flow: ['messages', 'xử lý từng câu', 'gom token', 'vocabulary'],
      steps: [
        'List comprehension|[preprocess_text(m) for m in messages] tạo list kết quả cho mọi tin nhắn.',
        'Set loại từ lặp|Thêm một từ đã tồn tại không tạo bản sao thứ hai.',
        'Cố định thứ tự cột|Set không đảm bảo thứ tự cột. Sắp xếp vocabulary hoặc dùng cùng vectorizer đã fit.'
      ],
      code: 'processed = [preprocess_text(m) for m in messages]\nvocabulary = sorted({word for row in processed for word in row})',
      input: 'list[str] các tin nhắn', output: 'list[list[str]] và danh sách từ duy nhất',
      why: 'Mỗi cột vector cần một nghĩa ổn định. Nếu lần sau đổi thứ tự vocabulary, cùng một số có thể chỉ sang từ khác.',
      question: 'Vì sao không tạo set/vocabulary mới cho từng câu dự đoán?',
      answer: 'Vị trí từ trong vector có thể đổi so với các cột model đã học.'
    },
    {
      chapter: 2, day: 'NGÀY 2 · BAG OF WORDS', title: 'BoW đếm từ: câu biến thành một hàng số',
      lede: 'Bag-of-Words bỏ qua thứ tự câu ở bước biểu diễn và đếm mỗi từ vựng xuất hiện bao nhiêu lần.',
      flow: ['free, win, meeting', '"free win win"', '[1, 2, 0]'],
      steps: [
        'Chốt các cột|Cột 0 luôn là free; cột 1 là win; cột 2 là meeting.',
        'Tạo vector số 0|Có một ô cho mỗi từ trong vocabulary.',
        'Tăng ô đúng vị trí|free xuất hiện một lần; win xuất hiện hai lần; meeting không xuất hiện.'
      ],
      code: 'vocabulary = ["free", "win", "meeting"]\ntokens = ["free", "win", "win"]\nvector = [tokens.count(word) for word in vocabulary]\nprint(vector)',
      input: 'tokens: list[str]', output: 'vector: list[int] = [1, 2, 0]',
      why: 'Mô hình cần đầu vào số. Cột nào có nghĩa gì phụ thuộc vocabulary và thứ tự của nó.',
      question: 'vector[1] = 2 nói lên điều gì?',
      answer: 'Từ ở vị trí 1 trong vocabulary, tức win, xuất hiện hai lần.'
    },
    {
      chapter: 2, day: 'NGÀY 2 · MA TRẬN', title: 'X là bảng số; y là nhãn tương ứng',
      lede: 'Sau khi vector hóa, mỗi hàng X là một email và mỗi cột là một từ vựng.',
      flow: ['m tin nhắn', 'X: m × n', 'y: m nhãn'],
      steps: [
        'X có hai chiều|m là số tin nhắn; n là số đặc trưng/từ vựng.',
        'y có một nhãn mỗi hàng|y[i] là ham/spam ứng với hàng X[i].',
        'Kiểm tra shape|Số hàng của X phải bằng số nhãn trong y.'
      ],
      code: 'X = vectorizer.fit_transform(processed_messages)\nprint(X.shape)  # (số tin, số từ)\nprint(y.shape)  # một nhãn mỗi tin',
      input: 'list[list[str]] đã xử lý + nhãn', output: 'ma trận số X và vector nhãn y',
      why: 'Shape cho biết model nhận bao nhiêu ví dụ và đặc trưng. Kiểm tra sớm giúp phát hiện dữ liệu bị lệch.',
      question: 'X có 100 hàng nhưng y có 99 nhãn. Có thể fit model không?',
      answer: 'Không. Cần tìm hàng hoặc nhãn bị thiếu trước khi huấn luyện.'
    },
    {
      chapter: 2, day: 'NGÀY 2 · CHIA DỮ LIỆU', title: 'Chia train/test trước khi học vocabulary',
      lede: 'Model chỉ nên học từ train. Nếu test ảnh hưởng vocabulary trước, thông tin test đã lọt vào khâu chuẩn bị.',
      flow: ['Dữ liệu', 'chia train/test', 'fit trên train', 'transform test', 'đánh giá'],
      steps: [
        'Chia trước|train_test_split tách ví dụ; stratify có thể giữ gần đúng tỉ lệ ham/spam.',
        'fit chỉ trên train|Vectorizer học vocabulary từ train và tạo ma trận train.',
        'transform test bằng mapping cũ|Không fit lại trên test; dùng đúng vocabulary học từ train.'
      ],
      code: 'train_tokens, test_tokens, y_train, y_test = train_test_split(processed, y)\ndictionary = sorted({word for row in train_tokens for word in row})\nX_train = [create_features(t, dictionary) for t in train_tokens]\nX_test = [create_features(t, dictionary) for t in test_tokens]',
      input: 'dữ liệu đã tách thành train và test', output: 'train để học; test chỉ để đo',
      why: 'Notebook tạo vocabulary từ toàn bộ tin nhắn trước khi chia. Cách sạch hơn là chia trước rồi chỉ fit biến đổi trên train.',
      question: 'Bộ nào gọi fit_transform: train hay test?',
      answer: 'Train. Test chỉ gọi transform để giữ mapping đã học.'
    },
    {
      chapter: 3, day: 'NGÀY 3 · HUẤN LUYỆN', title: 'fit học từ ví dụ kèm đáp án',
      lede: 'Ta có ma trận X và nhãn y. Thuật toán tìm quy luật từ các ví dụ trong tập train.',
      flow: ['X_train', '+ y_train', 'fit(model)', 'model đã học'],
      steps: [
        'X_train là dấu hiệu|Mỗi hàng chứa số đếm/đặc trưng của một email.',
        'y_train là đáp án|Mỗi vị trí cho biết lớp đúng của hàng X cùng vị trí.',
        'fit điều chỉnh model|fit tính thống kê từ train; nó không phải lệnh dự đoán.'
      ],
      code: 'model = MultinomialNB()\nmodel.fit(X_train_vec, y_train)',
      input: 'ma trận train + nhãn train', output: 'model đã học thống kê từ train',
      why: 'Tách fit và predict giúp không nhầm dữ liệu dùng học với dữ liệu dùng hỏi model.',
      question: 'Vì sao không truyền y_test vào model.fit?',
      answer: 'y_test được giữ lại để kiểm tra. Nếu dùng khi học, phép đo sẽ không còn công bằng.'
    },
    {
      chapter: 3, day: 'NGÀY 3 · NAIVE BAYES', title: 'Naive Bayes cộng nhiều dấu hiệu để so lớp',
      lede: 'Với tin nhắn “free meeting”, model xem từ nào thường xuất hiện trong spam, từ nào thường gặp trong ham.',
      flow: ['từ trong email', 'thống kê theo lớp', 'kết hợp dấu hiệu', 'ham / spam'],
      steps: [
        'Đếm trong từng lớp|Model đếm từ trong các email ham và spam ở tập train.',
        'Tính điểm mỗi lớp|Kết hợp xác suất dấu hiệu và tỉ lệ lớp để chọn lớp phù hợp hơn.',
        'Vì sao “naive”?|Thuật toán giả định các từ độc lập có điều kiện theo lớp; giả định này đơn giản hóa phép tính.'
      ],
      input: 'vector số của email mới', output: 'điểm so sánh cho mỗi lớp → nhãn',
      why: 'Model không hiểu nghĩa câu như người. Nó học thống kê từ ví dụ có nhãn rồi dùng thống kê để chọn lớp.',
      question: 'Nếu free thường gặp trong spam, model dùng nó thế nào?',
      answer: 'free là dấu hiệu nghiêng về spam; các dấu hiệu khác và tỉ lệ lớp cũng được kết hợp.'
    },
    {
      chapter: 3, day: 'NGÀY 3 · LÀM TRƠN', title: 'Smoothing ngăn một từ chưa thấy loại cả lớp',
      lede: 'Nếu từ chưa từng xuất hiện trong ham ở train, xác suất thô bằng 0 có thể làm điểm lớp ham thành 0.',
      flow: ['đếm từ', 'cộng alpha', 'xác suất khác 0', 'so lớp'],
      steps: [
        'Mẫu ít không phải bằng chứng tuyệt đối|Chưa thấy từ X trong ham không chứng minh X không thể có trong ham.',
        'Cộng lượng nhỏ|MultinomialNB mặc định alpha=1.0 để làm trơn xác suất từ.',
        'Không phải dữ liệu thật|Smoothing điều chỉnh thống kê; nó không tạo email mới hay đổi nhãn train.'
      ],
      code: 'model = MultinomialNB(alpha=1.0)\nmodel.fit(X_train_vec, y_train)',
      input: 'số lần từ xuất hiện theo lớp', output: 'xác suất ổn định hơn cho từ hiếm',
      why: 'alpha lớn làm phân phối mượt hơn; thư viện dùng alpha=1.0 nếu không chỉ định.',
      question: 'Smoothing có nghĩa là model đã nhìn thấy từ đó trong email thật không?',
      answer: 'Không. Đây là cách tính để số đếm 0 không loại ngay một lớp.'
    },
    {
      chapter: 3, day: 'NGÀY 3 · FIT & PREDICT', title: 'fit học; predict hỏi model trên ví dụ mới',
      lede: 'Hai hàm khác nhiệm vụ và cần dữ liệu có cùng hình dạng như khi huấn luyện.',
      flow: ['fit(X_train, y_train)', 'model đã học', 'predict(X_new)', 'mã lớp'],
      steps: [
        'fit nhận X và y|X_train thường là ma trận hai chiều; y_train có một nhãn mỗi hàng.',
        'predict nhận X mới|Một email cũng phải thành một hàng hai chiều, với đúng các cột đã học.',
        'Kết quả là mảng nhãn|predict trả mảng một chiều; với một email lấy prediction[0].'
      ],
      code: 'model.fit(X_train_vec, y_train)\nprediction = model.predict(X_new_vec)\nprint(prediction[0])',
      input: 'X_new_vec: shape (1, số_từ)', output: 'mã nhãn dự đoán, ví dụ 1',
      why: 'Shape sai thường do vectorizer khác, thiếu reshape hoặc vocabulary khác với lúc model fit.',
      question: 'Model học 500 cột. Có thể đưa hàng chỉ có 499 cột không?',
      answer: 'Không. Model cần đúng số cột và đúng thứ tự đặc trưng.'
    },
    {
      chapter: 3, day: 'NGÀY 3 · ĐÁNH GIÁ', title: 'Accuracy là phần dự đoán đúng trên tập đang đo',
      lede: 'Accuracy trả lời: trong các ví dụ đánh giá, bao nhiêu phần trăm dự đoán trùng nhãn thật?',
      flow: ['y_true', 'so sánh', 'y_pred', 'đúng / tổng'],
      steps: [
        'Dùng tập test|Đo trên dữ liệu model chưa dùng khi fit để ước lượng khả năng tổng quát.',
        'Đếm dự đoán đúng|accuracy = số dự đoán đúng / tổng số ví dụ.',
        'Đọc trong ngữ cảnh|Nếu ham nhiều hơn spam, đoán ham mọi lúc vẫn có thể đạt accuracy cao.'
      ],
      code: 'y_pred = model.predict(X_test_vec)\nscore = accuracy_score(y_test, y_pred)\nprint(score)',
      input: 'nhãn thật + nhãn dự đoán', output: 'một số từ 0 đến 1',
      why: 'Notebook có output 98% đã lưu. Đó là kết quả của dataset/lần chạy đó; bộ ví dụ nhỏ không hứa lặp lại 98%.',
      question: 'Accuracy cao có đảm bảo không bỏ sót spam quan trọng không?',
      answer: 'Không. Cần xem thêm precision, recall và confusion matrix, nhất là khi lớp mất cân bằng.'
    },
    {
      chapter: 3, day: 'NGÀY 3 · SỬA BUG', title: 'Truyền processed_text, không truyền nhầm text',
      lede: 'Notebook truyền text thay vì processed_text vào hàm tạo đặc trưng. Python có thể lặp chuỗi theo ký tự như thể mỗi ký tự là một token.',
      flow: ['text: str', 'preprocess_text', 'list[str]', 'vector', 'predict'],
      steps: [
        'Đọc dữ liệu hàm cần|Nếu create_features lặp qua tokens, nó cần list token chứ không phải câu str.',
        'Theo biến mới nhất|Sau preprocess_text(text), processed_text đã có đúng dạng đầu vào.',
        'Giữ cột nhất quán|Dùng vocabulary/vectorizer đã học rồi reshape thành một hàng nếu cần.'
      ],
      code: 'processed_text = preprocess_text(text)\nfeatures = create_features(processed_text, dictionary)\nfeatures = np.array(features).reshape(1, -1)\nprediction = model.predict(features)',
      input: 'text: str → processed_text: list[str]', output: 'features: một hàng số model hiểu được',
      why: 'Khi nghi ngờ, in type(value), len(value) và vài phần tử đầu. Kiểu dữ liệu làm lộ lỗi truyền nhầm biến.',
      question: 'text và processed_text khác nhau ở đâu?',
      answer: 'text là câu thô dạng str; processed_text là list token đã chuẩn hóa.'
    },
    {
      chapter: 3, day: 'NGÀY 3 · TỰ RÁP PIPELINE', title: 'Từ câu mới đến ham/spam: giữ đúng thứ tự',
      lede: 'Tự dựng xương sống từ câu raw đến nhãn chữ. Mỗi bước phải dùng đúng mapping đã fit trên train.',
      flow: ['raw str', 'tokens', 'vector 2D', 'predict', 'inverse_transform', 'ham/spam'],
      steps: [
        '1 · Tiền xử lý|preprocess_text(text) phải trả list token theo cùng quy tắc đã dùng ở train.',
        '2 · Tạo đặc trưng|Dùng vectorizer/dictionary đã fit; không tạo bộ từ mới cho email này.',
        '3 · Dự đoán rồi đổi nhãn|Model trả mã số; LabelEncoder.inverse_transform đổi mã về ham/spam.'
      ],
      code: 'tokens = preprocess_text(text)\nfeatures = create_features(tokens, dictionary)\nrow = np.array(features).reshape(1, -1)\npredicted_id = model.predict(row)\nlabel = label_encoder.inverse_transform(predicted_id)[0]',
      input: 'Một email mới dạng str', output: 'Một nhãn chữ: ham hoặc spam',
      why: 'Thay đổi tiền xử lý, thứ tự cột hoặc mã nhãn đều có thể làm kết quả sai dù code vẫn chạy.',
      question: 'Hãy tự kể lại pipeline mà không nhìn code: bước nào đến trước predict?',
      answer: 'Tiền xử lý câu → vector hóa bằng mapping đã fit → predict mã lớp → inverse_transform thành ham/spam.'
    }
  ];

  const root = document.querySelector('#presentation');
  if (!root) return;
  const content = root.querySelector('#slide-content');
  const stage = root.querySelector('#slide-stage');
  const counter = root.querySelector('#slide-counter');
  const progress = root.querySelector('.slide-progress');
  const progressFill = root.querySelector('#slide-progress-fill');
  const previous = root.querySelector('#slide-prev');
  const next = root.querySelector('#slide-next');
  const closeButton = root.querySelector('#close-presentation');
  const openButton = document.querySelector('#open-presentation');
  let currentIndex = 0;
  let touchStart = null;
  let lastFocus = null;

  function escapeHTML(value) {
    return String(value).replace(/[&<>"']/g, character => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    })[character]);
  }

  function renderSlide(index, moveFocus = true) {
    currentIndex = Math.max(0, Math.min(slides.length - 1, index));
    const slide = slides[currentIndex];
    const flow = slide.flow?.length
      ? '<div class="thinking-flow" aria-label="Luồng dữ liệu">' + slide.flow.map((item, i) => (i ? '<i aria-hidden="true">→</i>' : '') + '<span>' + escapeHTML(item) + '</span>').join('') + '</div>'
      : '';
    const steps = slide.steps?.length
      ? '<div class="thinking-steps">' + slide.steps.map((step, i) => {
          const divider = step.indexOf('|');
          const heading = divider < 0 ? step : step.slice(0, divider);
          const detail = divider < 0 ? '' : step.slice(divider + 1);
          return '<article><span>' + String(i + 1).padStart(2, '0') + '</span><div><b>' + escapeHTML(heading) + '</b><p>' + escapeHTML(detail) + '</p></div></article>';
        }).join('') + '</div>'
      : '';
    const code = slide.code
      ? '<section class="slide-code"><span>CODE · ĐỌC TỪ TRÊN XUỐNG</span><pre><code>' + escapeHTML(slide.code) + '</code></pre></section>'
      : '<section class="slide-code slide-no-code"><span>GHI NHỚ</span><p>Đừng đoán ý nghĩa chỉ từ tên thuật toán. Theo dõi dữ liệu thật qua từng bước.</p></section>';
    content.innerHTML =
      '<div class="slide-heading"><p class="eyebrow">' + escapeHTML(slide.day) + '</p><h1 id="slide-title" tabindex="-1">' + escapeHTML(slide.title) + '</h1><p class="slide-lede" id="slide-lede">' + escapeHTML(slide.lede) + '</p></div>' +
      flow +
      '<div class="slide-columns"><div class="slide-main-column">' + steps + '<section class="slide-why"><b>Vì sao bước này cần thiết?</b><p>' + escapeHTML(slide.why) + '</p></section></div><aside class="slide-side-column">' + code +
      '<div class="slide-io"><div><small>ĐẦU VÀO</small><p>' + escapeHTML(slide.input || 'Dữ liệu từ bước ngay trước đó') + '</p></div><span aria-hidden="true">↓</span><div><small>ĐẦU RA</small><p>' + escapeHTML(slide.output || 'Kết quả chuyển sang bước kế tiếp') + '</p></div></div></aside></div>' +
      '<details class="slide-question"><summary>Tự trả lời trước khi xem gợi ý</summary><div><b>' + escapeHTML(slide.question) + '</b><p>' + escapeHTML(slide.answer) + '</p></div></details>';
    counter.textContent = (currentIndex + 1) + ' / ' + slides.length;
    progress.setAttribute('aria-valuemax', String(slides.length));
    progress.setAttribute('aria-valuenow', String(currentIndex + 1));
    progressFill.style.width = ((currentIndex + 1) / slides.length * 100) + '%';
    previous.disabled = currentIndex === 0;
    next.innerHTML = currentIndex === slides.length - 1 ? '<span>Về bài học</span> ✓' : '<span>Slide tiếp</span> →';
    root.querySelectorAll('[data-slide-chapter]').forEach(button => {
      const active = Number(button.dataset.slideChapter) === slide.chapter;
      button.classList.toggle('active', active);
      if (active) button.setAttribute('aria-current', 'step');
      else button.removeAttribute('aria-current');
    });
    stage.scrollTop = 0;
    if (moveFocus) content.querySelector('#slide-title')?.focus({ preventScroll: true });
  }

  function openPresentation() {
    lastFocus = document.activeElement;
    root.hidden = false;
    document.body.classList.add('presentation-active');
    renderSlide(currentIndex, false);
    closeButton.focus();
  }

  function closePresentation() {
    root.hidden = true;
    document.body.classList.remove('presentation-active');
    lastFocus?.focus?.();
  }

  openButton?.addEventListener('click', openPresentation);
  closeButton.addEventListener('click', closePresentation);
  previous.addEventListener('click', () => renderSlide(currentIndex - 1));
  next.addEventListener('click', () => currentIndex === slides.length - 1 ? closePresentation() : renderSlide(currentIndex + 1));
  root.querySelectorAll('[data-slide-chapter]').forEach(button => {
    button.addEventListener('click', () => {
      const first = slides.findIndex(slide => slide.chapter === Number(button.dataset.slideChapter));
      if (first >= 0) renderSlide(first);
    });
  });

  document.addEventListener('keydown', event => {
    if (root.hidden) return;
    if (event.key === 'Escape') {
      event.preventDefault();
      closePresentation();
      return;
    }
    const typing = event.target.matches('input, textarea, [contenteditable="true"]');
    if (!typing && event.key === 'ArrowRight') {
      event.preventDefault();
      if (currentIndex < slides.length - 1) renderSlide(currentIndex + 1);
    } else if (!typing && event.key === 'ArrowLeft') {
      event.preventDefault();
      if (currentIndex > 0) renderSlide(currentIndex - 1);
    } else if (event.key === 'Tab') {
      const focusable = [...root.querySelectorAll('button:not(:disabled), summary')].filter(element => element.getClientRects().length);
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
  });

  stage.addEventListener('touchstart', event => {
    const touch = event.changedTouches[0];
    touchStart = { x: touch.clientX, y: touch.clientY };
  }, { passive: true });
  stage.addEventListener('touchend', event => {
    if (!touchStart) return;
    const touch = event.changedTouches[0];
    const dx = touch.clientX - touchStart.x;
    const dy = touch.clientY - touchStart.y;
    if (Math.abs(dx) > 65 && Math.abs(dy) < 90) {
      if (dx < 0 && currentIndex < slides.length - 1) renderSlide(currentIndex + 1);
      else if (dx > 0 && currentIndex > 0) renderSlide(currentIndex - 1);
    }
    touchStart = null;
  }, { passive: true });

  window.NLP_PRESENTATION = slides;
  renderSlide(0, false);
})();
