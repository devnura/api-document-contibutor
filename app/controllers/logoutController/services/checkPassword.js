const bcrypt = require('bcrypt');

const service = async (user, password) => {
    console.log("[*] Compare password..")
    let hash = user.e_password
    hash = hash.replace('$2y$', '$2b$')
    let compare = await bcrypt.compare(password, hash);

    if (compare) return true;
    return false;
}

module.exports = service;