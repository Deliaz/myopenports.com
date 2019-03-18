export default function () {
    const noop = () => {
    };

    return new Promise((resolve) => {
        const RTCPeerConnectionConstructor = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection;
        if (!RTCPeerConnectionConstructor) {
            resolve(null);
        }
        const pc = new RTCPeerConnectionConstructor({
            iceServers: []
        });

        pc.createDataChannel("");
        pc.createOffer(pc.setLocalDescription.bind(pc), noop);

        pc.onicecandidate = function (ice) {
            if (!ice || !ice.candidate || !ice.candidate.candidate) {
                return;
            }
            const localIp = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/.exec(ice.candidate.candidate)[1];
            pc.onicecandidate = noop;

            resolve(localIp);
        };
    });
}
