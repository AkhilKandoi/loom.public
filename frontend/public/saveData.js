
document.getElementById('savebtn').addEventListener('click', async () => {
    const username = document.getElementById('usernametext').innerText

    try {
        const res1 = await fetch('/data', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username })
        })
        if (res1.ok) {
            const data = await res1.json()
            if (data.message == 'user dont exists') {
                const msg = document.getElementById('messageBox')
                if (msg) {
                    document.getElementById('keyInput1').value = ''
                    msg.style.display = 'flex'
                    document.getElementById('keyInput1').focus()
                }

            }
            else if (data.message == 'user exists') {
                const msg = document.getElementById('messageBoxSaveKey')
                if (msg) {
                    document.getElementById('keyInput2').value = ''
                    msg.style.display = 'flex'
                    document.getElementById('keyInput2').focus()
                }
            }
        } else {
            const data = await res1.json()
            alert(`saving failed : ${data.message}`)
        }
    } catch (error) {
        console.error("saving error:", error)
        alert('saving failed due to unexpected error')
    }
})

async function handleKey1(e) {
    e.preventDefault()

    const username = document.getElementById('usernametext').innerText
    const fontStyle = document.getElementById('fontSelector').value
    const fontSize = document.getElementById('fontSizeSelector').value
    const pageColor = document.getElementById('pageColorInput').value
    const fontColor = document.getElementById('fontColorInput').value
    const backgroundColor = document.getElementById('backgroundColorInput').value
    const entryText = document.getElementById('page').value
    const createdAt = new Date().toLocaleString()
    const userKey = document.getElementById('keyInput1').value

    document.getElementById('messageBox').style.display = 'none'
    const entry = await encrypt(entryText, userKey)

    try {
        const res = await fetch('/loom', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, fontStyle, fontSize, pageColor, fontColor, backgroundColor, entry, createdAt })
        })

        if (res.ok) {
            document.getElementById('messageBoxSave').style.display = 'flex'
            setTimeout(() => {
                document.getElementById('messageBoxSave').style.display = 'none'
            }, 1500)
        } else {
            const data = await res.json()
            alert(`saving failed: ${data.message}`)
        }
    } catch (error) {
        console.error("saving error 2:", error)
        alert('saving failed due to unexpected error')
    }

}

async function handleKey2(e) {

    e.preventDefault()

    const username = document.getElementById('usernametext').innerText
    const userKey = document.getElementById('keyInput2').value
    const fontStyle = document.getElementById('fontSelector').value
    const fontSize = document.getElementById('fontSizeSelector').value
    const pageColor = document.getElementById('pageColorInput').value
    const fontColor = document.getElementById('fontColorInput').value
    const backgroundColor = document.getElementById('backgroundColorInput').value
    const entryText = document.getElementById('page').value
    const createdAt = new Date().toLocaleString()

    document.getElementById('messageBoxSaveKey').style.display = 'none'
    const entry = await encrypt(entryText, userKey)
    try {
        const res = await fetch('/loom', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, fontStyle, fontSize, pageColor, fontColor, backgroundColor, entry, createdAt })
        })

        if (res.ok) {
            document.getElementById('messageBoxSave').style.display = 'flex'
            setTimeout(() => {
                document.getElementById('messageBoxSave').style.display = 'none'
            }, 1000)
        } else {
            const data = await res.json()
            alert(`saving failed: ${data.message}`)
        }
    } catch (error) {
        console.error("saving error:", error)
        alert('saving failed due to unexpected error')
    }

}

document.getElementById('takeKey1').addEventListener('submit', handleKey1);
document.getElementById('takeKey2').addEventListener('submit', handleKey2);

async function encrypt(plaintext, userKey) {

    const enc = new TextEncoder();
    const encodedText = enc.encode(plaintext);
    const encodedPassword = enc.encode(userKey);
    const passwordHash = await crypto.subtle.digest('SHA-256', encodedPassword);
    const key = await crypto.subtle.importKey(
        'raw',            // raw binary key
        passwordHash,     // 32-byte key derived from password
        'AES-GCM',        // algorithm
        false,            // not extractable
        ['encrypt']       // key usage
    );

    const iv = crypto.getRandomValues(new Uint8Array(12));

    const ciphertext = await crypto.subtle.encrypt(
        { name: 'AES-GCM', iv },
        key,
        encodedText
    );

    const combined = new Uint8Array(iv.length + ciphertext.byteLength);
    combined.set(iv, 0);
    combined.set(new Uint8Array(ciphertext), iv.length);

    const base64 = toBase64(combined);
    return base64;
}

function toBase64(uint8Array) {
    let binary = '';
    for (let i = 0; i < uint8Array.length; i++) {
        binary += String.fromCharCode(uint8Array[i]);
    }
    return btoa(binary);
}