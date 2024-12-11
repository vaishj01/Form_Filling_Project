from flask import Flask, render_template, request, redirect, url_for, session
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)
app.secret_key = 'your_secret_key'  # Set a secret key for sessions

# Dummy database for demonstration
users_db = {}

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        
        if username in users_db and check_password_hash(users_db[username], password):
            session['username'] = username  # Store username in session
            return redirect(url_for('insurance_form'))
        else:
            return render_template('login.html', error="Invalid credentials")
    return render_template('login.html')

@app.route('/signup', methods=['GET', 'POST'])
def signup():
    if request.method == 'POST':
        first_name = request.form['firstName']
        last_name = request.form['lastName']
        email = request.form['email']
        username = request.form['username']
        password = request.form['password']
        
        # Hash the password
        hashed_password = generate_password_hash(password, method='sha256')
        
        # Store user in the dummy database
        users_db[username] = hashed_password
        
        return redirect(url_for('login'))
    
    return render_template('signup.html')

@app.route('/insurance_form')
def insurance_form():
    if 'username' not in session:
        return redirect(url_for('login'))  # Redirect to login if not logged in
    return render_template('insurance_form.html')

@app.route('/logout')
def logout():
    session.pop('username', None)  # Remove username from session
    return redirect(url_for('login'))

if __name__ == '__main__':
    app.run(debug=False, host='127.0.0.1', port=5000)

