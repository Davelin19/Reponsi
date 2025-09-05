import pymysql
def connect_to_db():
    host = os.environ.get('DB_HOST')
    user = os.environ.get('DB_USER')
    password = os.environ.get('DB_PASSWORD')
    db = os.environ.get('DB_NAME')
    port = int(os.environ.get('DB_PORT', 3306))

    print("🔍 DB CONFIG ->", host, user, db, port, flush=True)

    return pymysql.connect(
        host=host,
        user=user,
        password=password,
        database=db,
        port=port,
        cursorclass=pymysql.cursors.DictCursor,
        charset='utf8mb4'
    )
