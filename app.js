const express = require('express');
const bodyParser = require('body-parser');
const QRCode = require('qrcode');

const app = express();
const port = 3000;

// Middleware para ler dados no formato JSON
app.use(bodyParser.json());

// Servir arquivos estáticos (HTML, CSS, JS)
app.use(express.static('public'));

// Rota para gerar o QR Code de pagamento
app.get('/generate-qr', (req, res) => {
    const paymentUrl = "https://seusistema.com/pagamento?valor=10"; // URL de pagamento
    QRCode.toDataURL(paymentUrl, (err, url) => {
        if (err) {
            res.status(500).send('Erro ao gerar o QR Code');
        } else {
            res.json({ qrCodeUrl: url });
        }
    });
});

// Rota de exemplo para simulação de pagamento (ajustar conforme integração com API de pagamento)
app.post('/pay', (req, res) => {
    const { valor, metodoPagamento } = req.body;

    if (metodoPagamento === 'cartao') {
        res.json({ message: `Pagamento de R$${valor} realizado com cartão de débito` });
    } else {
        res.status(400).json({ message: 'Método de pagamento não suportado' });
    }
});

// Iniciar o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
