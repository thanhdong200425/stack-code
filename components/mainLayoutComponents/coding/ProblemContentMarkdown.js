"use client";

import { useMDXComponents } from "@/mdx-components";
import { MDXRemote } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import { useEffect, useState } from "react";

export default function ProblemContent({ mdxContent }) {
    const [mdxSource, setMdxSource] = useState(null);
    const components = useMDXComponents();

    useEffect(() => {
        async function serializeMdx() {
            const source = await serialize(mdxContent);
            setMdxSource(source);
        }
        serializeMdx();
    }, [mdxContent]);

    if (!mdxSource) return <div>Loading...</div>;

    return <MDXRemote {...mdxSource} components={components} />;
}
