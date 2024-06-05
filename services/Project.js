const Project = require('../models/Project');
const Employee = require('../models/Employee');
const Client = require('../models/Client');
const Document = require('../models/Document');

class ProjectService {
    async addProject(prj) {
        try {
            // Ensure project manager exists
            const projectManager = await Employee.findById(prj.projectManager);
            if (!projectManager) {
                throw new Error('Project Manager does not exist');
            }

            // Ensure client exists
            const client = await Client.findById(prj.client);
            if (!client) {
                throw new Error('Client does not exist');
            }

            // Set project manager as a team member
            prj.teamMembers = [prj.projectManager];

            const project = new Project(prj);
            return await project.save();
        } catch (error) {
            throw error;
        }
    }

    async getProject(prj_id) {
        try {
            const project = await Project.findById(prj_id).populate('client projectManager teamMembers attachments');
            if (!project) {
                throw new Error(`Project with id ${prj_id} not found`);
            }
            return project;
        } catch (error) {
            throw error;
        }
    }

    async getAllProjects() {
        try {
            return await Project.find().populate('client projectManager teamMembers attachments');
        } catch (error) {
            throw error;
        }
    }

    async getProjectsByUser(userId) {
        try {
            const user = await Employee.findById(userId);
            if (!user) {
                throw new Error('User not found');
            }

            if (user.role === 'ADMIN') {
                return await Project.find().populate('client projectManager teamMembers attachments');
            } else {
                return await Project.find({ teamMembers: { $in: [userId] } }).populate('client projectManager teamMembers attachments');
            }
        } catch (error) {
            throw error;
        }
    }

    async deleteProject(prj_id) {
        try {
            await Project.findByIdAndDelete(prj_id);
        } catch (error) {
            throw error;
        }
    }

    async deleteProjects(ids) {
        try {
            await Project.deleteMany({ _id: { $in: ids } });
        } catch (error) {
            throw error;
        }
    }

    async updateProject(updates, prj_id) {
        try {
            const project = await Project.findById(prj_id);
            if (!project) {
                throw new Error(`Project with id ${prj_id} not found`);
            }

            // Update project attributes
            for (const key in updates) {
                project[key] = updates[key];
            }

            return await project.save();
        } catch (error) {
            throw error;
        }
    }

    async validateProject(prj) {
        // Validate project attributes here
        if (!prj.name || !prj.client || !prj.projectManager) {
            throw new Error('Project name, client, and project manager are required');
        }
        return true;
    }
}

module.exports = ProjectService;
