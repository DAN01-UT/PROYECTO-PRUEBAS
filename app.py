from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def login():
    return render_template('Login.html')

@app.route('/home')
def home():
    return render_template('Home.html')

@app.route('/esquema')
def esquema():
    return render_template('esquema.html')

@app.route('/conexiones')
def conexiones():
    return render_template('conexiones.html')

@app.route('/layout')
def layout():
    return render_template('layout.html')

@app.route('/logout')
def logout():
    return render_template('Login.html')  



if __name__ == '__main__':
    app.run(debug=True)
