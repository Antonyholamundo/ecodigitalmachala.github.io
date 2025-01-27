class PatientManager {
    constructor() {
        this.patients = [];
        this.currentId = null;
        this.modal = null;
        this.init();
    }

    init() {
        // Inicializar el modal después de que el DOM esté cargado
        this.modal = new bootstrap.Modal(document.getElementById('patientModal'));
        this.renderPatients();
        document.getElementById('patientForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.savePatient();
        });
    }

    savePatient() {
        const patient = {
            id: this.currentId || Date.now(),
            nombre: document.getElementById('nombre').value,
            apellidos: document.getElementById('apellidos').value,
            telefono: document.getElementById('telefono').value,
            fechaNacimiento: document.getElementById('fechaNacimiento').value,
            sexo: document.getElementById('sexo').value,
            email: document.getElementById('email').value
        };

        if (this.currentId) {
            const index = this.patients.findIndex(p => p.id === this.currentId);
            this.patients[index] = patient;
            this.currentId = null;
        } else {
            this.patients.push(patient);
        }

        this.renderPatients();
        this.resetForm();
        this.modal.hide();
    }

    editPatient(id) {
        const patient = this.patients.find(p => p.id === id);
        if (patient) {
            this.currentId = id;
            document.getElementById('nombre').value = patient.nombre;
            document.getElementById('apellidos').value = patient.apellidos;
            document.getElementById('telefono').value = patient.telefono;
            document.getElementById('fechaNacimiento').value = patient.fechaNacimiento;
            document.getElementById('sexo').value = patient.sexo;
            document.getElementById('email').value = patient.email;
            this.modal.show();
        }
    }

    deletePatient(id) {
        if (confirm('¿Está seguro de eliminar este paciente?')) {
            this.patients = this.patients.filter(p => p.id !== id);
            this.renderPatients();
        }
    }

    renderPatients() {
        const tbody = document.getElementById('patientList');
        tbody.innerHTML = '';
        
        this.patients.forEach(patient => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${patient.nombre}</td>
                <td>${patient.apellidos}</td>
                <td>${patient.telefono}</td>
                <td>${this.formatDate(patient.fechaNacimiento)}</td>
                <td>${patient.sexo === 'M' ? 'Masculino' : 'Femenino'}</td>
                <td>${patient.email}</td>
                <td>
                    <button class="btn btn-sm btn-warning me-2" onclick="patientManager.editPatient(${patient.id})">
                        <i class="bi bi-pencil"></i> Editar
                    </button>
                    <button class="btn btn-sm btn-danger" onclick="patientManager.deletePatient(${patient.id})">
                        <i class="bi bi-trash"></i> Eliminar
                    </button>
                </td>
            `;
            tbody.appendChild(tr);
        });
    }

    formatDate(date) {
        return new Date(date).toLocaleDateString();
    }

    resetForm() {
        document.getElementById('patientForm').reset();
        this.currentId = null;
    }
}

// Inicializar el gestor de pacientes cuando el DOM esté cargado
document.addEventListener('DOMContentLoaded', () => {
    window.patientManager = new PatientManager();
});