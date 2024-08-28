export default () => ({
    reportComponent: {
        report: JSON.parse(localStorage.getItem('report')) || [],
        addProject: function(title) {
            this.report.push({title: title, tasks: []});
        },
        deleteProject: function(index) {
            this.report.splice(index, 1);
            this.storeReport();
        },
        addTask: function(projectIndex, title, hours) {
            this.report[projectIndex].tasks.push({title: title, hours: hours});
            this.storeReport();
        },
        deleteTask: function(projectIndex, taskIndex) {
            this.report[projectIndex].tasks.splice(taskIndex, 1);
        },
        storeReport: function () {
            localStorage.setItem('report', JSON.stringify(this.report));
        },
        stringifyReport: function () {
            let totalHours = 0;
            return 'Привіт, сьогодні працював над:' + '\n' + this.report.reduce((acc, project, index) => {
                const projectIndex = index + 1;
                return acc + projectIndex + ') ' + project.title + '\n' + project.tasks.reduce((acc, task, index) => {
                    const taskIndex = index + 1;
                    totalHours += parseInt(task.hours);
                    return acc + '  ' + projectIndex + '.' + taskIndex + ') ' + task.title + ' - ' + task.hours + ' години\n';
                }, '')
        }, '') + 'Сумарно пропрацював ' + totalHours + ' годин';}
    },
})