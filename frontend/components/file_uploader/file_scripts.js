import { Document, Packer, Paragraph, TextRun } from "docx"
import { saveAs } from 'file-saver';

export { prepareConfirmationDownload, preparePackingSlipsDownload, preparePullsheetDownload }

const CONFIRMATION_HEADERS = 'order-id\torder-item-id\tquantity\tship-date\tcarrier-code\tcarrier-name\ttracking-number\tship-method\ttransparency_code\r\n'

function prepareConfirmationDownload(confirmation_file){
  if(confirmation_file){
    let output = CONFIRMATION_HEADERS
    const today = new Date()
    for(let order of Object.values(confirmation_file)){
      output += `${order['order-id']}\t\t\t${today.getFullYear()}-${today.getMonth()+1}-${today.getDate()}\t\t\t\t\t\r\n`
    }
    return makeURL(output)
  }
}

function preparePullsheetDownload(pull_sheet){
  if(pull_sheet){
    const headers = ['quantity-to-ship','rarity','product-name']
    const content = [headers]
    for(const [rarity,items] of Object.entries(pull_sheet)){
      for(const [product_name,count] of Object.entries(items)){
        const row = [count, rarity, product_name]
        content.push(row)
      }
    }
    const csv = makeCSV(content)
    return makeURL(csv)
  }
}

function preparePackingSlipsDownload(packing_slips){
  if(packing_slips){
    makeDoc(packing_slips)
  }
}

function makeDoc(packing_slips) {
  // new docx instance
  let doc = new Document({
    creator: 'GC',
    sections: [],
  });
  let fontSize = 26
  for (const [address, info] of Object.entries(packing_slips)) {
    // test cards
    // info['products']['Elemental Hero Liquid Soldier - LDS3-EN103 - Secret Rare - 1st Edition'] = 3
    // info['products']['Dinomorphia Rexterm - DIFO-EN038 - Ultra Rare - 1st Edition'] = 2
    // info['products']['YU-GI-OH! - Black Luster Soldier - Envoy of the Beginning (CT10-EN005) - 2013 Collectors Tins - Limited Edition - Super Rare'] = 3
    // info['products']['Allure of Darkness - BROL-EN088 - Ultra Rare - 1st Edition'] = 3
    // info['products']['Magikuriboh - BACH-EN001 - Super RARE - 1st Edition'] = 2

    let name = new TextRun({
      text: info['recipientName'],
      bold: true,
      size: fontSize,
      // break: 1,
    })
    let addressLine1 = new TextRun({
      text: `${info['shipAddress1']} ${info['shipAddress2']} ${info['shipAddress3']}`,
      bold: true,
      size: fontSize,
      break: 1,
    });
    let addressLine2 = new TextRun({
      text: `${info['shipCity']}, ${info['shipState']} ${info['shipPostalCode']}`,
      bold: true,
      size: fontSize,
      break: 1,
    });

    let addressParagraph = new Paragraph({
      children: [name, addressLine1, addressLine2]
    });


    let itemsParagraphChildren = []
    let totalItemsCount = 0
    for (const [productName, count] of Object.entries(info['products'])) {
      let countText = new TextRun({
        text: `[${count}] `,
        bold: true,
        size: fontSize,
        break: 1,
      });
      let productNameText = new TextRun({
        text: `${productName}`,
        size: fontSize,
      })
      // used to create a line break between each product-item
      let lineBreak = new TextRun({
        text: "",
        size: 16,
        break: 1,
      })
      itemsParagraphChildren.push(countText, productNameText, lineBreak)
      totalItemsCount += count
    }

    let itemsParagraph = new Paragraph({
      children: itemsParagraphChildren,
      spacing: {
        before: 1000,
      }
    });
    let totalCountText = new TextRun({
      text: `Total: ${totalItemsCount}`,
      bold: true,
      size: fontSize,
      break: 1,
    })
    let totalCountParagraph = new Paragraph({
      children: [totalCountText]
    })

    doc.addSection({
      properties: {
        page: {
          margin: {
            left: 1000,
            right: 1000,
          }
        }
      },
      children: [addressParagraph, itemsParagraph, totalCountParagraph]
    })
  }

  //and using this function we can save our file from the browser
  saveDocumentToFile(doc, `packing_slips.docx`);
}

function saveDocumentToFile(doc, fileName) {
  // const packer = new Packer();
  // const mimeType =
  // "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
  // packer.toBlob(doc).then(blob => {
  //   const docblob = blob.slice(0, blob.size, mimeType);
  //   saveAs(docblob, fileName);
  // });
  Packer.toBlob(doc).then(blob => {
    saveAs(blob, `packing_slips`)
  })
}


function makeCSV(content) {
  let csv = '';
  content.forEach(value => {
    value.forEach((item, i) => {
      let innerValue = item === null ? '' : item.toString();
      let result = innerValue.replace(/"/g, '""');
      if (result.search(/("|,|\n)/g) >= 0) {
        result = '"' + result + '"'
      }
      if (i > 0) {csv += ','}
      csv += result;
    })
    csv += '\n';
  })
  return csv
}

function makeURL(output){
  const blob = new Blob([output])
  return URL.createObjectURL(blob)
}