let entries = []
let currentIndex = 0
let userKey = ''
let username = ''

document.getElementById('showEntries').addEventListener('click', async () => {
  username = document.getElementById('usernametext').innerText
  try {
    const res1 = await fetch('/data', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username })
    })
    if (res1.ok) {
      const data = await res1.json()
      if (data.message == 'user dont exists') {
        alert('Please make an entry first')
        return;
      }

      const msg = document.getElementById('messageBoxShowKey')
      if (msg) {
        document.getElementById('keyInput3').value = ''
        msg.style.display = 'flex'
        document.getElementById('keyInput3').focus()
      }

    } else {
      const data = await res1.json()
      alert(`showing failed 3: ${data.message}`)
    }
  } catch (error) {
    console.error("showing error:", error)
    alert('showing failed 4 due to unexpected error')
  }
})

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('takeKey3').addEventListener('submit', async (e) => {
    e.preventDefault()

    userKey = document.getElementById('keyInput3').value
    if (!userKey) {
      alert('Please enter a key')
      return
    }
    try {
      const res = await fetch('/entries', {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({ username })
      })

      if (res.ok) {
        const data = await res.json()
        entries = data.entries
        currentIndex = 0
        document.getElementById('entryScroll').style.display = 'flex'
        document.getElementById('messageBoxShowKey').style.display = 'none'
        if (entries.length > 0) {
          document.getElementById('savebtn').disabled = true
          displayEntries()
        } else {
          alert('no entries  for this user')
        }
      } else {
        alert('Failed to fetch entries')
      }
    } catch (error) {
      console.error("showing error:", error)
      alert('showing failed  2 due to unexpected error')
    }
  })
})


async function displayEntries() {
  const entry = entries[currentIndex]
  let counter = currentIndex + 1


  const decryptedEntry = await decrypt(entry.entry, userKey)
  const lineHeight = parseInt(entry.fontSize) + 8;

  console.log(document.getElementById('page'))
  const page = document.getElementById('page')
  page.value = decryptedEntry
  page.style.fontFamily = entry.fontStyle
  page.style.fontSize = entry.fontSize + 'px'
  page.style.lineHeight = lineHeight + 'px';
  page.style.backgroundSize = `100% ${lineHeight}px`;
  page.style.backgroundColor = entry.pageColor
  page.style.color = entry.fontColor

  document.getElementById('container').style.backgroundColor = entry.backgroundColor

  document.getElementById('fontSelector').value = entry.fontStyle
  document.getElementById('fontSizeSelector').value = entry.fontSize
  document.getElementById('pageColorInput').value = entry.pageColor
  document.getElementById('fontColorInput').value = entry.fontColor
  document.getElementById('backgroundColorInput').value = entry.backgroundColor
  document.getElementById('dateShow').innerText = entry.createdAt
  document.getElementById('counter').innerText = counter
}

document.getElementById('prev').addEventListener('click', showPrevious)
document.getElementById('forw').addEventListener('click', showNext)

function showNext() {
  if (currentIndex < entries.length - 1) {
    currentIndex++;
    displayEntries();
  }
}

function showPrevious() {
  if (currentIndex > 0) {
    currentIndex--;
    displayEntries();
  }
}




async function decrypt(base64, userKey) {
  const encryptedBytes = fromBase64(base64);

  const iv = encryptedBytes.slice(0, 12); // first 12 bytes = IV
  const ciphertext = encryptedBytes.slice(12); // rest = actual encrypted data

  const enc = new TextEncoder();
  const encodedPassword = enc.encode(userKey);
  const passwordHash = await crypto.subtle.digest('SHA-256', encodedPassword);

  const key = await crypto.subtle.importKey(
    'raw',
    passwordHash,
    'AES-GCM',
    false,
    ['decrypt']
  );

  try {
    const decryptedBuffer = await crypto.subtle.decrypt(
      { name: 'AES-GCM', iv },
      key,
      ciphertext
    );

    const dec = new TextDecoder();
    return dec.decode(decryptedBuffer);
  } catch (err) {
    console.error('❌ Decryption failed:', err);
    throw new Error('Decryption failed. Possibly wrong key or corrupted data.');
  }
}

function fromBase64(base64) {
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
}

