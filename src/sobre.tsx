import 'react-resizable/css/styles.css';
import './App.css';

const Sobre: React.FC = () => {

    return (
        <div className="container">
            <div id='corpo'>
                <br />
                <h1>Sobre nós</h1>
                <h4>Algumas informações sobre como coletamos e filtramos os dados até que eles cheguem em nosso site</h4>
                <br />
                <h2>ESP8266</h2>
                <p>O módulo ESP8266 pode ser utilizado para criar sistemas de monitoramento remoto. Por exemplo, é possível desenvolver um dispositivo que monitore sensores de temperatura, umidade e pressão e envie os dados para um servidor na nuvem.</p>
                <img className="imgs" src="/ESP8266.png" alt="Imagem do módulo ESP8266" />
                <br /><br /><br />
                <h2>DHT11</h2>
                <p>O DHT11 é um sensor capaz de medir a temperatura e a umidade do ambiente. Este componente é constituído de duas partes principais: um sensor de umidade capacitivo e um sensor de temperatura termistor NTC, isto é um resistor sensível à variação de temperatura.</p>
                <img className="imgs" src="/DHT11.png" alt="Imagem do sensor DHT11" />
                <br /><br /><br />
                <h2>MQ-135</h2>
                <p>O MQ-135 é um sensor de gás utilizado para detectar a presença de diversos gases, como amônia, monóxido de carbono, álcool, dióxido de carbono e outros poluentes. Ele é comumente empregado em sistemas de monitoramento de qualidade do ar, como em dispositivos de purificação ou para medir a poluição em ambientes internos.</p>
                <img className="imgs" src="/MQ-135.png" alt="Imagem do sensor MQ-135" />
            </div>

            <div className="footer">
                <img className="logo" src="/ifoco.png" alt="Logotipo do site escrito IFOCO" />

                <div className="social-icons">
                    <a href="https://www.instagram.com/ifpocosoficial/" target="_blank" rel="noopener noreferrer">
                        <img className="imglink" src="instagram.png" alt="Logotipo doInstagram com link para o perfil doInstituto Federal" />
                    </a>
                    <a href="https://br.linkedin.com/company/ifpocosoficial" target="_blank" rel="noopener noreferrer">
                        <img className="imglink" src="linkedin.png" alt="Logotipo doLinkedin com link para o perfil doInstituto Federal" />
                    </a>
                    <a href="https://facebook.com/ifpocosoficial/?locale=pt_BR" target="_blank" rel="noopenernoreferrer">
                        <img className="imglink" src="facebook.png" alt="Logotipo doFacebook com link para o perfil doInstituto Federal" />
                    </a>
                </div>
            </div>
        </div>
    );

}

export default Sobre;