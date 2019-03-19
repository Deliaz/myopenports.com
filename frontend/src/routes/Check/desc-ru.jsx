import React from 'react';

export default function () {
    return <div>
        <h2 className="is-size-4">Что означает результат проверки порта?</h2>

        <p className="is-size-5">Статус <strong className="tag is-close-color">закрыт</strong></p>
        <p>Подключиться к этому порту в данный момент невозможно. Вредоносные программы или злоумышленники не могут
            воспользоваться данным портом для атаки или получения конфиденциальной информации. Если все неизвестные
            порты имеют статус "закрыт", то это означает хороший уровень защищенности компьютера от сетевых угроз.</p>

        <p>Если порт должен быть открытым, то это плохой показатель. Причиной недоступности порта может быть неверная
            настройка сетевого оборудования или программного обеспечения. Проверьте права доступа программ к сети в
            файерволе. Удостоверьтесь, что порты проброшены через роутер.</p>

        <p>Результат "порт закрыт" также можно получить, если порт открыт, но время отклика вашего компьютера в сети
            (пинг) завышено. Подключится к порту в таких условиях практически не представляется возможным.</p>

        <p className="is-size-5">Статус <strong className="tag is-open-color">открыт</strong></p>
        <p>
            К данному порту можно произвести подключение, он доступен из интернета. Если это то, что требуется —
            прекрасно.</p>

        <p>Если неизвестна причина, по которой порт может быть открытым, то стоит проверить запущенные программы и
            сервисы. Возможно, некоторые из них вполне легально используют этот порт для работы с сетью. Существует
            вероятность, что порт открыт в следствии работы несанкционированного/вредоносного программного обеспечения.
            В таком случае рекомендуется проверить компьютер антивирусом.</p>
    </div>;
}