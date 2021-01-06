
export default class Job {
    constructor({ company, jobTitle, hours, rate, description, id }) {
        console.log("MODEL: constructor", 3)
        this.id = id
        this.company = company
        this.jobTitle = jobTitle
        this.hours = hours
        this.rate = rate
        this.description = description
    }

    get Template() {
        return `
        <div class="col-md-4 col-6 mt-3">
    <div class="card">
        <div class="card-body">
            <h4 class="card-title">${this.company}</h4>
            <p class="card-text">Job Title - ${this.jobTitle}</p>
            <p class="card-text">Job Description - ${this.description}</p>
            <p class="card-text">Rate - ${this.rate}</p>
            <p class="card-text">Hours per week - ${this.hours}</p>
            <div class="text-right">
            <button type="button" class="btn btn-danger" onclick="app.jobsController.deleteJob('${this.id}')">Delete</button>
            </div>
        </div>
    </div>
    </div>

        `
    }
}