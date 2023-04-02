import { KnobContainer, KnobGrid } from '../KnobGrid';
import { ProjectBar } from '../ProjectBar';
import { useProjectContext } from '../context/project';
import { MPHeader } from '../mp/MPHeader';

export function UIController() {
  const { project, dispatch } = useProjectContext();

  function onProjectDataChanged(values: number[][]) {
    dispatch({ type: 'project:data', data: { data: values } });
  }

  return (
    <>
      <ProjectBar />
      <div className='flex justify-center mb-24'>
        <div className='flex flex-col p-4'>
          <div className='flex flex-col px-3 py-2 mb-4 rounded-lg bg-[#060606]'>
            <MPHeader />
          </div>
          <KnobContainer className='bg-[#060606] rounded-lg relative'>
            <KnobGrid
              highlight={[project.previousNote, project.currentNote]}
              onValueChanged={onProjectDataChanged}
              values={project.data}
              className='max-w-[60vh] max-h-[60vh] w-[80vw] h-[80vw] md:w-[75vw] md:h-[75vw]'
              rows={8}
              columns={8}
              gridTemplateAreas={`'zero hl hl hl hl hl hl hl'
                                'vl d d d d d d d'
                                'vl d d d d d d d'
                                'vl d d d d d d d'
                                'vl d d d d d d d'
                                'vl d d d d d d d'
                                'vl d d d d d d d'
                                'vl d d d d d d d'`}
              horizontalLabels={
                <div
                  className='flex items-end justify-center pb-2'
                  style={{ gridArea: 'hl' }}
                >
                  {['I', 'ii', 'iii', 'IV', 'V', 'vi', 'vii'].map(
                    (label, index) => (
                      <span
                        className='flex-1 inline-block text-xs text-center text-neutral-500'
                        key={index}
                      >
                        {label}
                      </span>
                    )
                  )}
                </div>
              }
              verticalLabels={
                <div
                  className='flex flex-col items-end justify-center pr-2'
                  style={{ gridArea: 'vl' }}
                >
                  {['I', 'ii', 'iii', 'IV', 'V', 'vi', 'vii'].map(
                    (label, index) => (
                      <div className='flex items-center flex-1' key={index}>
                        <span className='inline-block text-xs text-center text-neutral-500'>
                          {label}
                        </span>
                      </div>
                    )
                  )}
                </div>
              }
            >
              <div style={{ gridArea: 'zero' }}></div>
            </KnobGrid>
          </KnobContainer>
        </div>
      </div>
    </>
  );
}
