from flask import Flask, jsonify

app = Flask('backend')

@app.route('/submin_loan', methods=['POST'])
def index():
    return jsonify(dict(status='success'))

if __name__ == '__main__':
    app.run(port=4000, debug=True)
