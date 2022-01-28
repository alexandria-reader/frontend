/* eslint-disable max-len */
export default function FAQ() {
  return (
    <div>
      <div className="bg-secondary text-primary py-20 px-4 md:px-16">
          <div className="mx-auto max-w-6xl flex flex-col md:flex-row">
              <h2 className="mr-8 w-full md:w-1/3 text-3xl font-extrabold leading-9">
                  Frequently-asked questions
              </h2>
              <dl className="w-full md:w-2/3">
              <dt className="mb-4">
                      <h3 className="text-xl font-bold leading-snug tracking-tight mb-1">
                          What languages do you support?
                      </h3>
                  </dt>
                  <dd className="mb-16">
                      <p className="text-secondary">
                        We currently support English, Spanish, French, Italian, Portuguese, Romanian, German, Dutch, Swedish and Turkish. We plan on adding more languages in the future.
                      </p>
                  </dd>
                  <dt className="mb-4">
                      <h3 className="text-xl font-bold leading-snug tracking-tight mb-1">
                          What motivated you to make this app?
                      </h3>
                  </dt>
                  <dd className="mb-16">
                      <p className="text-secondary">
                        We are a trio of software engineers who came across the challenge of creating an app that facilitated learning languages through reading. Although a number of apps exist in either open source or paid form, none of them met the full spectrum of needs based on the checklist of our language-learning enthusiast team member.
                      </p>
                  </dd>
                  <dt className="mb-4">
                      <h3 className="text-xl font-bold leading-snug tracking-tight mb-1">
                          Do I need an account to access what Alexandria has to offer?
                      </h3>
                  </dt>
                  <dd className="mb-16">
                      <p className="text-secondary">
                          Yes, you will need an account to upload texts and save translations. Only an email address is required to <a className="underline decoration-2 decoration-sky-600 hover:decoration-blue-400" href="/signup">sign up</a>, and you will be directed to your account immediately.
                      </p>
                  </dd>
                  <dt className="mb-4">
                      <h3 className="text-xl font-bold leading-snug tracking-tight mb-1">
                          How do you compare with other language learning apps?
                      </h3>
                  </dt>
                  <dd className="mb-16">
                      <p className="text-secondary">
                          We are a free and open source project that welcome community input and contribution. Development of Alexandria commenced in earnest around December 2021, and we expect to continue adding features and fixing bugs throughout 2022.
                      </p>
                  </dd>
                  <dt className="mb-4">
                      <h3 className="text-xl font-bold leading-snug tracking-tight mb-1">
                          I have a suggestion for a feature, or found a bug. What should I do?
                      </h3>
                  </dt>
                  <dd className="mb-16">
                      <p className="text-secondary">
                          Great! Please get in touch by <a className="underline decoration-2 decoration-sky-600" href="mailto:support@tryalexandria.com">emailing us</a>, or opening a <a rel="noopener noreferrer" className="underline decoration-2 decoration-sky-600" target="_blank" href="https://github.com/alexandria-reader/frontend/issues/new/choose">ticket</a> directly in our Github repository.
                      </p>
                  </dd>
                  <dt className="mb-4">
                      <h3 className="text-xl font-bold leading-snug tracking-tight mb-1">
                          Can I contribute to the project by fixing up a bug or adding a new feature?
                      </h3>
                  </dt>
                  <dd className="mb-16">
                      <p className="text-secondary">
                          Yes you can! Clone our <a rel="noopener noreferrer" className="underline decoration-2 decoration-sky-600" target="_blank" href="https://github.com/alexandria-reader/frontend">Git repository</a>, add your awesome patch or sparkling new feature, and push it to the main branch for review!
                      </p>
                  </dd>
              </dl>
          </div>
      </div>
    </div>
  );
}
