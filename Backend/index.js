require('dotenv').config();

const express = require('express');
const cors = require('cors');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
let validationTokensDB = [];


const app = express();
app.set("port", process.env.PORT || 5000);
app.use(express.urlencoded());
app.use(express.json());
app.use(cors());

const user = require('./models/user.model');

/* '/register' - este endpoint regista novos utilizadores */
app.post('/register', async (req, res) => {
	try{
        let foundUser = await user.findOne({where: {email: req.body.email}})
            .then((data) => { if (data == null) return false; else return true; })
            .catch((error) => { return true; });

        if (!foundUser) {
            const { nome, email, password } = req.body;
            let newUser = await user.create({nome: nome, email: email, password: password})
                .then((data) => {
                    console.log('Novo utilizador registado: ', data);
                    res.status(200).json({ success: true, message: 'Registado com sucesso.'});
                })
                .catch((error) => {
                    res.status(400).json({ success: false, message: 'Erro ao registar utilizador.'});
                });
		} else {
			res.status(403).json({ success: false, message: 'O utilizador já existe.'});
		}
	} catch{
		res.status(500).json({ success: false, message: 'Erro interno no servidor.'});
	}
});

/* '/login' - este endpoint faz o login de um utilizador, em caso de sucesso envia os tokens de acesso e de refresh */
app.post('/login', async (req, res) => {
	try{
		let foundUser = await user.findOne({where: {email: req.body.email}})
            .then((data) => { if (data == null) return false; else return data; })
            .catch((error) => { return true; });

		if (foundUser) {
            console.log(req.body.password + ", "+ foundUser.password);
			const passwordMatch = await bcrypt.compare(req.body.password, foundUser.password);
            console.log(passwordMatch);

            if (passwordMatch) {
				const payload = { email: foundUser.email };
                console.log(payload);
				const aToken = generateAccessToken(payload);
                console.log(aToken);
				const rToken = jwt.sign(payload, process.env.VALIDATION_TOKEN_SECRET);
                console.log(rToken);
				validationTokensDB.push(rToken); //armazenamos o token de validação 
                const userid = foundUser.id;
                console.log(userid);
				res.status(200).json({ success: true, AccessToken: aToken , RefreshToken: rToken, idUtilizador: userid, message: 'Auntenticação realizada com sucesso.'});
			} else {
				res.status(403).json({ sucess: false, message: 'Dados do utilizador inválidos.'});
			}
		}
		else {
			res.status(404).json({ sucess: false, message: 'Dados inválidos.'});
		}
	} catch{
		res.status(500).json({ success: false, message: 'Erro interno no servidor.'});
	}
});

/* Esta função gera o token de autenticação válido pelo tempo definido no EXPIRATION_TIME */
function generateAccessToken(payload) {
    try {
        return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: process.env.EXPIRATION_TIME});
    }
    catch {
        res.status(500).json({ success: false, message: 'Erro interno no servidor.'});
    }
}

/* '/token' - este endpoint gera um novo token de autenticação tendo por base o token de refresh */
app.post('/refreshToken', (req,res) => {
		const authHeader = req.headers['authorization'];
		const token = authHeader && authHeader.split(' ')[1];

		if(token == null){
			res.status(400).json({ success: false, message: 'Token inválido.'});
		}

		if(!validationTokensDB.includes(token)){
			res.status(400).json({ success: false, message: 'Token inválido.'});
		}

		jwt.verify(token, process.env.VALIDATION_TOKEN_SECRET, (err,payload) => {
			if(err){
				res.status(401).json({ success: false, message: 'Dados inválidos.'});
			}
			else{
				const accessToken = generateAccessToken({ email: payload.email });
				res.status(200).json({ sucess: true, AccessToken: accessToken, message: 'Auntenticação renovada com sucesso.'});
			}
		});
});


/* '/logout' - este endpoint apaga o token de validação */
app.delete('/logout', (req,res) => {
	try {
        const authHeader = req.headers['authorization'];
	    const token = authHeader && authHeader.split(' ')[1];

        if(token == null){
            res.status(400).json({ success: false, message: 'Token inválido.'});
        }
        else {
            var index = validationTokensDB.indexOf(token);
            delete validationTokensDB[index];
            res.status(204).json({ success: true, message: 'Token apagado com sucesso.' });
        }
    } catch {
        res.status(500).json({ success: false, message: 'Erro interno no servidor.'});
    }
});
/* ------------------------------------------------------------------------------------------- */


/* Este método verifica se o utilizador está autenticado com sucesso para poder aceder ao endpoint pretendido. */
function AuthenticateAccessToken(req,res,next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if(token == null){
        res.status(400).json({ success: false, message: 'Token inválido.'});
    }
    else{
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err,user) => {
            if(err){
                res.status(500).json({ success: false, message: 'Erro interno no servidor.'});
            }
            else{ next(); }
        });
    }
}
/* ------------------------------------------------------------------------------------------- */




const utilizador = require('./routes/utilizador.route');
app.use('/api/v1',AuthenticateAccessToken, utilizador);


const produto = require('./routes/produto.route');
app.use('/api/v1', AuthenticateAccessToken, produto);

const compra = require('./routes/compra.route');
app.use('/api/v1', AuthenticateAccessToken, compra);

app.listen(app.get("port"), () => {
    console.log("API em execução... [url: http://localhost:"+app.get("port")+"/api/v1]");
});
