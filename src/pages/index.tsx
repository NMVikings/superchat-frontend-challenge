import type { NextPage } from "next";
import React from "react";

import { postNewConfig } from "../api/client";
import Button from "../components/Button";
import Input from "../components/Input";
import Label from "../components/Label";
import RadioGroup from "../components/RadioGroup";
import SuccessSubmit from "../components/SuccessSubmit";

const useHandleForm = () => {
  const [linkId, setLinkId] = React.useState(null);
  const [error, setError] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> =
    React.useCallback(
      async (e) => {
        e.preventDefault();
        const form = new FormData(e.target as HTMLFormElement);

        const username = form.get("username") as string;
        const repositoryName = form.get("repositoryName") as string;
        const icon = form.get("icon") as string;

        try {
          setLoading(true);
          setError(null);

          const { id } = await postNewConfig({
            username,
            repositoryName,
            icon,
          });
          setLinkId(id);
        } catch (err) {
          const message = (err as Error)?.message ?? "Unknown error";
          setError(message);
        } finally {
          setLoading(false);
        }
      },
      [setError, setLoading]
    );

  return { linkId, error, loading, handleSubmit };
};

const Home: NextPage = () => {
  const { linkId, error, loading, handleSubmit } = useHandleForm();
  return (
    <>
      <div className="px-4 sm:px-0 mb-10">
        <h3 className="text-lg font-medium leading-6 text-gray-900">
          CrazyGithubLinks
        </h3>
        <p className="mt-1 text-sm text-gray-600">
          You can create an awesome page for any repository and share the link
          with your followers on any social network
        </p>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="shadow overflow-hidden sm:rounded-md">
          <div className="px-4 py-5 bg-white sm:p-6">
            <div className="grid grid-cols-2 grid-rows-2 gap-6">
              <div className="col-span-2 sm:col-span-1">
                <Label htmlFor="username">Username</Label>
                <Input required name="username" id="username" />
              </div>
              <div className="col-span-2 sm:col-span-1">
                <Label htmlFor="repositoryName">Repository name</Label>
                <Input required name="repositoryName" id="repositoryName" />
              </div>
              <div className="col-span-2 sm:col-span-1">
                <Label htmlFor="icon">Icon</Label>
                <div className="mt-1">
                  <RadioGroup
                    options={["✨", "🔥", "❤️", "💕"]}
                    name="icon"
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
            {linkId ? (
              <SuccessSubmit linkId={linkId} />
            ) : (
              <>
                <span className="text-red-600 mr-4 text-sm">{error}</span>
                <Button type="submit" disabled={loading}>
                  Create repository page
                </Button>
              </>
            )}
          </div>
        </div>
      </form>
    </>
  );
};

export default Home;
