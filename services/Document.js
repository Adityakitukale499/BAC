const Document = require('../models/Document');
const Employee = require('../models/Employee');

class DocumentService {
    async findDocumentByDocName(fileName) {
        try {
            return await Document.findOne({ docName: fileName });
        } catch (error) {
            throw error;
        }
    }

    async findDocumentById(id) {
        try {
            const document = await Document.findById(id).populate('employee');
            if (!document) {
                throw new Error(`Document with id ${id} not found.`);
            }
            const auth = document.employee._id.toString();
            const loggedInUser = (await Employee.findById(auth))._id.toString();
            if (auth !== loggedInUser) {
                throw new AccessDeniedException('Employee does not have access to the document');
            }
            return document;
        } catch (error) {
            throw error;
        }
    }

    async addDocument(file, employeeId) {
        try {
            const document = new Document({
                docName: file.originalname,
                employee: employeeId,
                file: file.buffer
            });
            await document.save();
            return document;
        } catch (error) {
            throw error;
        }
    }

    async deleteDocument(id, employeeId) {
        try {
            const document = await Document.findById(id);
            if (!document) {
                throw new Error(`Document with id ${id} not found.`);
            }
            const auth = document.employee.toString();
            if (auth !== employeeId) {
                throw new AccessDeniedException('Employee does not have access to delete the document');
            }
            await Document.findByIdAndDelete(id);
        } catch (error) {
            throw error;
        }
    }
}

module.exports = DocumentService;
