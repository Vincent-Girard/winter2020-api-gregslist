import { ProxyState } from "../AppState.js"
import { jobsService } from "../Services/JobsServices.js"

function _drawJobs() {
    let jobs = ProxyState.jobs
    let template = ''
    jobs.forEach(job => {
        template += job.Template
    })
    document.getElementById('jobs').innerHTML = template
}

export default class JobsController {
    constructor() {
        ProxyState.on("jobs", _drawJobs)
        _drawJobs()
        this.getJobs()
    }

    getJobs() {
        try {
            jobsService.getJobs()
        } catch (error) {
            console.error(error)
        }
    }

    createJob() {
        window.event.preventDefault()
        console.log("creating job", 1)
        let form = window.event.target
        let newJob = {
            company: form['company'].value,
            jobTitle: form['jobTitle'].value,
            hours: form['hours'].value,
            rate: form['rate'].value,
            description: form['description'].value,
        }
        try {
            jobsService.creatJob(newJob)
        } catch (error) {
            console.error(error)
        }
        form.reset()
        $("#new-job-modal").modal('hide');
    }

    deleteJob(id) {
        try {
            jobsService.deleteJob(id)
        } catch (error) {
            console.error(error)
        }
    }

    getOne() {
        let id = ProxyState.jobs[0].id
        jobsService.getOne(id)
    }
}