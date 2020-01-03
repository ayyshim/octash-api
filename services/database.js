const success = require("../constants/success_message");
const { random_id } = require("../helpers");
const { Database } = require("../models");

async function set(project, col, data) {
  let { doc } = data;
  let doc_id = data.doc_id;

  if (!doc_id) {
    doc_id = random_id.generate(13);
  }

  const newData = new Database({
    col,
    project,
    documentID: doc_id,
    document: doc
  });

  await newData.save();

  return {
    status: success.status.CREATED,
    msg: success.message.SUCCESS,
    payload: {
      id: doc_id,
      body: {
        ...doc
      }
    }
  };
}

async function getCollectionDatas(project, col, options) {
  let { fields, condition } = options;
  fields = transformDocumentFields(fields);
  const datas = await Database.find(
    {
      project,
      col
    },
    fields
  );

  return {
    status: success.status.OK,
    msg: success.message.SUCCESS,
    payload: {
      length: datas.length,
      datas: datas.map(data => transformData(data))
    }
  };
}

async function getDocument(project, col, doc, options) {
  let { fields } = options;

  fields = transformDocumentFields(fields);

  const data = await Database.findOne({
    project,
    col,
    documentID: doc
  }).select(fields);

  return {
    status: success.status.OK,
    msg: success.message.SUCCESS,
    payload: {
      data: transformData(data)
    }
  };
}

async function deleteDocument(project, col, docs) {
  const datas = await Database.find({
    project,
    col,
    documentID: { $in: docs }
  });

  datas.forEach(async data => {
    await data.remove();
  });

  return {
    status: success.status.OK,
    msg: success.message.SUCCESS
  };
}

async function updateDocument(project, col, doc, update) {
  const data = await Database.findOne({
    project,
    col,
    documentID: doc
  });

  await data.updateOne({
    document: {
      ...data._doc.document,
      ...update
    }
  });

  return {
    status: success.status.OK,
    msg: success.message.SUCCESS
  };
}

function transformData(data) {
  return {
    id: data._doc.documentID,
    body: data._doc.document
  };
}

function transformDocumentFields(fields) {
  if (fields.length === 0) {
    return "";
  } else {
    fields = fields.map(field => `document.${field}`);

    fields = fields
      .toString()
      .split(",")
      .join(" ");

    return "documentID " + fields;
  }
}

module.exports = {
  set,
  getCollectionDatas,
  getDocument,
  deleteDocument,
  updateDocument
};
