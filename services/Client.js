const Client = require('../models/Client');

class ClientService {
    async addClient(clientData) {
        try {
            const client = new Client(clientData);
            await client.save();
            return client;
        } catch (error) {
            throw error;
        }
    }

    async getClients() {
        try {
            return await Client.find();
        } catch (error) {
            throw error;
        }
    }

    async deleteClient(id) {
        try {
            await Client.findByIdAndDelete(id);
        } catch (error) {
            throw error;
        }
    }

    async getClient(id) {
        try {
            return await Client.findById(id);
        } catch (error) {
            throw error;
        }
    }

    async updateClient(updates, id) {
        try {
            const client = await Client.findById(id);
            if (!client) {
                throw new Error(`Client with id ${id} not found.`);
            }
            for (const key in updates) {
                if (key === 'address') {
                    Object.assign(client.address, updates[key]);
                } else {
                    client[key] = updates[key];
                }
            }
            await client.save();
            return client;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = ClientService;
