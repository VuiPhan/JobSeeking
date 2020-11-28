import React, { useState } from 'react'
import SeekerAPI from 'api/JobSeeker/SeekerAPI';
import OpenForm from 'views/Forms/OpenForm';
import CVAddForm from 'views/Forms/CVAddForm';
import ListCV from 'views/Forms/ListCV';

function CVPage() {
  return (
    <div>
      <OpenForm ComponentForm={CVAddForm}></OpenForm>
    </div>
  )
}

export default CVPage
