const textElement = document.getElementById('text')
const optionButtonsElement = document.getElementById('option-buttons')

let state = {}

function startGame() {
  state = {}
  showTextNode(1)
}

function showTextNode(textNodeIndex) {
  const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
  textElement.innerText = textNode.text
  while (optionButtonsElement.firstChild) {
    optionButtonsElement.removeChild(optionButtonsElement.firstChild)
  }

  textNode.options.forEach(option => {
    if (showOption(option)) {
      const button = document.createElement('button')
      button.innerText = option.text
      button.classList.add('btn')
      button.addEventListener('click', () => selectOption(option))
      optionButtonsElement.appendChild(button)
    }
  })
}

function showOption(option) {
  return option.requiredState == null || option.requiredState(state)
}

function selectOption(option) {
  const nextTextNodeId = option.nextText
  if (nextTextNodeId <= 0) {
    return startGame()
  }
  state = Object.assign(state, option.setState)
  showTextNode(nextTextNodeId)
}

const textNodes = [
  {
    id: 1,
    text: 'Ideš iz škole',
    options: [
      {
        text: 'Slušao/la si učiteljicu',
        setState: { blueGoo: true },
        nextText: 2
      },
      {
        text: 'Spavao/la si tijekom nastave',
        nextText: 12
      }
    ]
  },
  {
    id: 2,
    text: 'Dolaziš do ceste',
    options: [
      {
        text: 'Dok hodaš uz cestu prema semaforu izvadi mobitel da pogledaš tik tok',
        requiredState: (currentState) => currentState.blueGoo,
        setState: { blueGoo: false, sword: true },
        nextText: 3
      },
      {
        text: 'Izvadi slušalice i upali muziku',
        requiredState: (currentState) => currentState.blueGoo,
        setState: { blueGoo: false, shield: true },
        nextText: 3
      },
      {
        text: 'Ideš do semafora te pratiš situaciju na cesti',
        nextText: 3
      }
    ]
  },
  {
    id: 3,
    text: 'Došao si do semafora',
    options: [
      {
        text: 'Ideš na crveno svijetlo',
        nextText: 4
      },
      {
        text: 'Ne gledaš semafor',
        nextText: 5
      },
      {
        text: 'Čekaš zeleno svijetlo',
        nextText: 6
      }
    ]
  },
  {
    id: 4,
    text: 'Lupio te auto',
    options: [
      {
        text: 'Igraj ponovo',
        nextText: -1
      }
    ]
  },
  {
    id: 5,
    text: 'Lupio te motor',
    options: [
      {
        text: 'Igraj ponovo',
        nextText: -1
      }
    ]
  },
  {
    id: 6,
    text: 'Došlo je zeleno svijetlo',
    options: [
        {
            text:'Pređi cestu',
            requiredState: (currentState) => currentState.sword,
            nextText: 9
        },
        {
            text:'Pređi cestu',
            requiredState: (currentState) => currentState.shield,
            nextText: 10
        },
      {
        
        text: 'Pogledaj za svaki slučaj lijevo-desno-lijevo',
        requiredState: (currentState) => currentState.blueGoo,
        nextText: 7
      }
    ]
  },
  {
    id: 7,
    text: 'Dok hodaš preko ceste nailazi auto',
    options: [
      {
        text: 'Ignoriraj ga',
        nextText: 8
      },
      {
        text: 'Pređi cestu',
        requiredState: (currentState) => currentState.sword,
        nextText: 9
      },
      {
        text: 'Pređi cestu',
        requiredState: (currentState) => currentState.shield,
        nextText: 10
      },
      {
        text: 'Potrči',
        requiredState: (currentState) => currentState.blueGoo,
        nextText: 11
      }
    ]
  },
  {
    id: 8,
    text: 'Na autu nije bilo kočnica',
    options: [
      {
        text: 'Igraj ponovo',
        nextText: -1
      }
    ]
  },
  {
    id: 9,
    text: 'Ostao si gledati mobitel i nisi pazio situaciju, auto nije gledao semafor',
    options: [
      {
        text: 'Igraj ponovo',
        nextText: -1
      }
    ]
  },
  {
    id: 10,
    text: 'Nisi čuo/la auto, auto nije gledao semafor',
    options: [
      {
        text: 'igraj ponovo',
        nextText: -1
      }
    ]
  },
  {
    id: 11,
    text: 'Uspješno si prešao cestu.',
    options: [
      {
        text: 'Igraj opet.',
        nextText: -1
      }
    ]
  },{
    id:12,
    text: 'Nisi slušao nastavu i lupio te auto na prvom križanju',
    options:[
      {
        text:'Igraj opet',
        nextText:-1
      }
    ]
  }
]

startGame()