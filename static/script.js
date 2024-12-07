document.addEventListener('DOMContentLoaded', function() {
    const formulario = document.getElementById('studyForm');
    const containerTopicos = document.getElementById('topicsContainer');
    const botaoAdicionarTopico = document.getElementById('addTopic');
    const modeloTopico = document.getElementById('topicTemplate');

    adicionarTopico();

    botaoAdicionarTopico.addEventListener('click', adicionarTopico);
    formulario.addEventListener('submit', aoEnviarFormulario);

    function adicionarTopico() {
        const elementoTopico = document.importNode(modeloTopico.content, true);
        const botaoRemover = elementoTopico.querySelector('.btn-remove');
        
        botaoRemover.addEventListener('click', function() {
            if (containerTopicos.children.length > 1) {
                this.closest('.topic-card').remove();
            }
        });

        containerTopicos.appendChild(elementoTopico);
    }

    async function aoEnviarFormulario(e) {
        e.preventDefault();

        const formData = new FormData();

        const tempoDisponivelInput = document.getElementById('tempo_disponivel');
        const tempoUnidadeSelect = document.getElementById('tempo_unidade');
        const tempoDisponivel = tempoDisponivelInput.value;
        const tempoUnidade = tempoUnidadeSelect.value;

        const topicos = containerTopicos.querySelectorAll('.topic-card');

        const tempoDisponivelEmMinutos = tempoUnidade === 'hours' ? tempoDisponivel * 60 : tempoDisponivel;

        formData.append('tempo_disponivel', tempoDisponivelEmMinutos);
        formData.append('num_topicos', topicos.length);
        formData.append('tempo_unidade', tempoUnidade);

        topicos.forEach((topico, indice) => {
            const nome = topico.querySelector('.topic-name').value;
            const prioridade = topico.querySelector('.priority').value;
            const dificuldade = topico.querySelector('.difficulty').value;

            formData.append(`topico_${indice + 1}`, nome);
            formData.append(`prioridade${indice + 1}`, prioridade);
            formData.append(`dificuldade_${indice + 1}`, dificuldade);
        });
        
        try {
            const resposta = await fetch('/gera-plano', {
                method: 'POST',
                body: formData
            });

            if (resposta.ok) {
                const resultado = await resposta.text();
                document.open();
                document.write(resultado);
                document.close();
            } else {
                alert('Erro ao gerar o plano de estudos. Por favor, tente novamente.');
            }
        } catch (erro) {
            console.error('Erro:', erro);
            alert('Erro ao gerar o plano de estudos. Por favor, tente novamente.');
        }
    }
});
