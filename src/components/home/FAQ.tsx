/* eslint-disable max-len */
export default function FAQ() {
  return (
    <div>
      <div className="bg-lightblue py-20 px-4">
          <div className="mx-auto max-w-6xl flex flex-col md:flex-row">
              <h2 className="mr-8 w-full md:w-1/3 text-3xl font-extrabold leading-9">
                  Frequently-asked questions
              </h2>
              <dl className="w-full md:w-2/3">
                  <dt className="mb-4">
                      <h3 className="text-xl font-bold leading-snug tracking-tight mb-1">
                          How does Alexandria work?
                      </h3>
                  </dt>
                  <dd className="mb-16">
                      <p className="text-gray-600">
                          Import a piece of text you would like to read in a language you're learning. Click on words you are not familiar with to set a "learning status" and apply a translation. When you have a moment, go to the "Words" section of the app to review the words.
                      </p>
                  </dd>
                  <dt className="mb-4">
                      <h3 className="text-xl font-bold leading-snug tracking-tight mb-1">
                          How do you compare with other language learning apps?
                      </h3>
                  </dt>
                  <dd className="mb-16">
                      <p className="text-gray-600">
                          We are a free and open source project that welcome community input and contribution.
                      </p>
                  </dd>
                  <dt className="mb-4">
                      <h3 className="text-xl font-bold leading-snug tracking-tight mb-1">
                          I have a suggestion, or found a bug.
                      </h3>
                  </dt>
                  <dd className="mb-16">
                      <p className="text-gray-600">
                          Great! Please get in touch by <a href="mailto:support@tryalexandria.com"> emailing us</a>, or add a ticket directly in our Github repository.
                      </p>
                  </dd>
              </dl>
          </div>
      </div>
    </div>
  );
}
